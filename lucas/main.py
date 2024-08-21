# Web3 imports
from web3 import AsyncWeb3
import json
# Fastapi imports
from fastapi import FastAPI, Request, Response, Body, HTTPException
from config import Node, Contract, Google
import uvicorn
from middleware.TimeMiddleware import TimeMiddleware
from fastapi.middleware.cors import CORSMiddleware
# from fastapi import BackgroundTasks 
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
#langchain
# from langchain.llms import HuggingFaceHub
# from langchain.prompts import PromptTemplate
# from langchain.chains import LLMChain
# from pydantic import BaseModel
#pandasai
from pandasai import Agent
import pandas as pd
# other imports
# from loguru import logger
from io import BytesIO
import qrcode
import cv2
from pyzbar.pyzbar import decode
import google.generativeai as genai
import cloudinary 
import cloudinary.uploader
import re
from collections import defaultdict
import os
from dotenv import load_dotenv
# import InHouseAI

load_dotenv()

w3 = None
contractwithsigner = None
app = FastAPI()
# app.include_router(InHouseAI.router, prefix="/inhouse")
contract = Contract()
node = Node()
app.add_middleware(TimeMiddleware)
Lighthouse_GATEWAY_URL = "https://ipfs.io/ipfs/"

origins = [
    "http://localhost",
    "http://localhost:8001",
    "http://localhost:3000",
    Lighthouse_GATEWAY_URL,
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = Google().api_key
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-pro')

cloudinary.config( 
  cloud_name = 'dzvstpvlt', 
  api_key = '188374828552585', 
  api_secret = 'vMCoE46Phj4zK5k7Bd13NOHuW78'
)

skills = [
    "python",
    "java",
    "c++",
    "git",
    "javascript",
    "full stack web development",
    "ai",
    "system design"
]
jobs_available = {
    "python": 100,
    "java": 75,
    "system design": 55,
    "c++": 50,
    "git": 25,
    "javascript": 40,
    "full stack web development": 30,
    "ai": 40
}
pattern = "|".join(re.escape(p) for p in skills)
knowledge_base = defaultdict(list)

conf = ConnectionConfig(
    MAIL_USERNAME = "dhananjay2002pai@gmail.com",
    MAIL_PASSWORD = "mxfzvwcytedlfewf",
    MAIL_FROM = "dhananjay2002pai@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    MAIL_FROM_NAME = "CredChain"
)

async def sendmail(email: str):
    html = f"""<p>Hi \n
                Please connect with this hiring recruiter, He came across your profile on CredChain and found it interesting. Please send your CV to this mail with Reasoning : {email} \n\n\n
                Thanks and Regards,\n\n
                DJ
            </p> """
    message = MessageSchema(
        subject="Connect with Hiring Recruiter - CredChain",
        recipients=["2020.dhananjay.pai@ves.ac.in"],
        body=html,
        subtype=MessageType.html)
    fm = FastMail(conf)
    await fm.send_message(message)
    return True

async def read_json():
    file = open(contract.abi_path)
    data = json.load(file)
    file.close()
    return data["abi"]

# llm = HuggingFaceHub(repo_id="google/flan-t5-base", model_kwargs={"temperature": 0.5, "max_length": 512})
# # Create a prompt template
# prompt_template = PromptTemplate(
#     input_variables=["question", "knowledge_base"],
#     template="Based on the following knowledge base: {knowledge_base}. This contains users wallet address mapped to list of their owned certificates.\n\nAnswer the following question: {question}"
# )
# Create an LLM chain
# llm_chain = LLMChain(llm=llm, prompt=prompt_template)

processed_knowledge_base = None
AGENT_DATA = {}


@app.on_event("startup")
async def lifespan():
    global w3
    w3 = AsyncWeb3(AsyncWeb3.AsyncHTTPProvider(node.url))
    contract_abi = await read_json()
    global contractwithsigner
    print(contract.address)
    contractwithsigner = w3.eth.contract(address=contract.address, abi=contract_abi)
    # print(f"Connected with smart contract with address {contract.address}")
    print(f"Connected with smart contract with address {contract.address}")
    accounts = await contractwithsigner.functions.getAccounts().call()
    global knowledge_base
    print(accounts)
    for account in accounts:
        metadata = await contractwithsigner.functions.getTokenIdAccount(account).call()
        metadata_shared = await contractwithsigner.functions.getTokenIdAccountSharing(account).call()
        data = metadata[:]+metadata_shared[:]
        knowledge_base[account].append(data)
    # knowledge_base = str(knowledge_base)
    global processed_knowledge_base
    processed_knowledge_base = preprocess_knowledge_base(knowledge_base)
    # yield
    print("Shutting down...")
    
def preprocess_knowledge_base(knowledge_base):
    processed_data = {}
    global AGENT_DATA
    user_lst, python_lst, java_lst, cpp_lst, webdev_lst, ai_lst = [], [], [], [], [], []
    for address, certificates in knowledge_base.items():
        user_skills = []
        python, java, cpp, webdev, ai = 0, 0, 0, 0, 0
        for cert in certificates[0]:
            skill = cert[0].lower()
            if "python" in skill:
                user_skills.append("Python")
                python += 1
            elif "java" in skill:
                user_skills.append("Java")
                java += 1
            elif "c++" in skill:
                user_skills.append("C++")
                cpp += 1
            elif "web development" in skill:
                user_skills.append("Web Development")
                webdev += 1
            elif "ai" in skill:
                user_skills.append("AI")
                ai += 1
        processed_data[address] = user_skills
        user_lst.append(address)
        python_lst.append(python)
        java_lst.append(java)
        cpp_lst.append(cpp)
        webdev_lst.append(webdev)
        ai_lst.append(ai)
    AGENT_DATA['User or Wallet Address'] = user_lst
    AGENT_DATA["Python"], AGENT_DATA["Java"], AGENT_DATA["C++"], AGENT_DATA["Web Development"], AGENT_DATA["AI"] = python_lst, java_lst, cpp_lst, webdev_lst, ai_lst
    return json.dumps(processed_data, indent=2)
    
@app.get("/")
async def home(id: str):
    val = await contractwithsigner.functions.getTotalMints().call()
    print(f"Total DeCAT Volume: {val}")
    tokenIds = await contractwithsigner.functions.getTokenIdAccount(id).call()
    ans = []
    for tokenId in tokenIds:
        tokenURI = await contractwithsigner.functions.tokenURI(tokenId[3]).call()
        ans.append({"tokenId": tokenId[3], "tokenURI": Lighthouse_GATEWAY_URL+tokenURI})
    print(f"Fetched SBT data for wallet address: {id}")
    return ans

@app.get("/endorsements_received")
async def home(id: str):
    ids = await contractwithsigner.functions.getTokenIdAccountEndorsing(id).call()
    print("Data Retrieved")
    ans = []
    for tokenId in ids:
        tokenURI = await contractwithsigner.functions.tokenURI(tokenId[3]).call()
        ans.append({"tokenId": tokenId[3], "tokenURI": Lighthouse_GATEWAY_URL+tokenURI})
    print(f"Fetched endorsing data for wallet address: {tokenId[3]}")
    return ans

@app.post("/generate_qrcode")
async def generate(request: Request):
    data = await request.json()
    str_data = json.dumps(data)
    print(str_data, type(str_data))
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(str_data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    image_stream = BytesIO()
    img.save(image_stream)
    image_stream.seek(0)
    result = cloudinary.uploader.upload(image_stream,public_id='qrcode')
    return result["secure_url"]
    # return FileResponse("qrcode.png", media_type="application/octet-stream", filename="qrcode.png")

@app.post("/scanQR")
async def scanQR():
    cap = cv2.VideoCapture(0)
    found_qr_data = False
    verified_data = False
    res = {}
    while True:
        ret, frame = cap.read()

        # Find and decode QR codes
        if frame is None: continue
        decoded_objects = decode(frame)
        
        # Display the image
        cv2.imshow("QR Code Scanner", frame)

        for obj in decoded_objects:
            data = obj.data.decode("utf-8")
            dict_data = json.loads(data)
            print(dict_data, type(dict_data))
            found_qr_data = True
            typeofSBT = dict_data["name"]
            address = dict_data["walletAddress"]
            tokenId = dict_data["tokenId"]
            print(f"Fetched type: {typeofSBT}, address: {address}, TokenId: {str(tokenId)}")
            flg = 0
            if flg == 0:
                tokenIds = await contractwithsigner.functions.getTokenIdAccount(address).call()
                print(tokenIds)
                for id in tokenIds:
                    # uri = await contractwithsigner.functions.tokenURI(id).call()
                    # if uri == URI: 
                    #     verified_data = True
                    if id[3] == tokenId:
                        verified_data = True
                        flg = 1
            elif flg == 0:
                tokenIds = await contractwithsigner.functions.getTokenIdAccountEndorsing(address).call()
                print(tokenIds)
                for id in tokenIds:
                    # uri = await contractwithsigner.functions.tokenURI(id).call()
                    # if uri == URI:
                    #     verified_data = True
                    if id[3] == tokenId: verified_data = True

        # Break the loop if 'q' key is pressed
        if (cv2.waitKey(1) & 0xFF == ord('q')):
            # Release the camera and close the window
            cap.release()
            cv2.destroyAllWindows()
            return Response("Exited with no response")
        if cv2.waitKey(1) & found_qr_data:
            # Release the camera and close the window
            cap.release()
            cv2.destroyAllWindows()
            if verified_data:
                res_string = f"The NFT with tokenId: {str(tokenId)} of wallet Address: {address} is Verified"
                res["msg"] = res_string
                res["tokenId"] = tokenId
                res["verified"] = True
                res["name"] = dict_data["name"]
                res["description"] = dict_data["description"]
                res["image"] = dict_data["image"]
            else:
                res_string = f"Unfortunately, The NFT with tokenId: {str(tokenId)} of wallet Address: {address} is NOT Verified"
                res["msg"] = res_string
                res["verified"] = False
            data = json.dumps(res)
            print(data)
            return Response(data)

    # Release the camera and close the window
    cap.release()
    cv2.destroyAllWindows()
    return Response("QRCode not detected")

@app.post("/getCasualInsights")
async def getInsights(data: list = Body(...)):
    if not data: return "Add something to your certificates List"
    response = model.generate_content("Generate text which should be strictly less 100 words limit and Make sure the generated text is in plain string text and should be without any '*' or neither any other such characters for designing. Generate text about casual Granular statistical overview Insights on this user data which signifies all the certificates earned in a particular field by that user : "+str(data)+". The text should contain this data for eg: x percent proficient in y field(example: 50% proficient in python with 2 certificates in python) and the total words of generated words is less than or equal to 100 words.")
    return response.text

@app.get("/getJobs")
async def getJobs():
    accounts = await contractwithsigner.functions.getAccounts().call()
    print(accounts)
    res = {}
    for account in accounts:
        metadata = await contractwithsigner.functions.getTokenIdAccount(account).call()
        metadata_shared = await contractwithsigner.functions.getTokenIdAccountSharing(account).call()
        data = metadata[:]+metadata_shared[:]
        for meta in data:
            matches = re.findall(pattern, meta[0].lower())
            for skill in matches:
                res[account] = res.get(account,0)+jobs_available[skill]
    return list(res.keys()), list(res.values())
            

@app.get("/getAllJobs")
async def getAlljobs():
    lst = str(skills)
    prompt = f"Get jobs available(openings) in India today for the given list of skills: {lst}. Make sure the generated answer is in the dictionary format where skill is mapped to its integer value indicating the availability such that I can convert the generated data to dictionary easily in python using json.loads function in python to convert the text to dict and without new lines. Normalize the values to lie between the range 1 to 100."
    response = model.generate_content(prompt)
    print(response.text, type(response.text))
    global jobs_available
    try:
        jobs_available = json.loads(response.text)  # Parse only if valid JSON
    except json.JSONDecodeError as e:
        print("Error parsing LLM output:", e)
    return jobs_available

@app.get("/chat")
async def chat(query: str):
    preprocessed_query = f"Web3 data: {knowledge_base} | User query: {query}. Generate the text in plain text format without '*' and without new lines."
    return getChat(preprocessed_query)

def getChat(query:str):
    response = model.generate_content(query)
    return response.text

# @app.post("/ask")
# async def ask(request: Request):
#     try:
#         body = await request.json()
#         query = body["query"]
#         print(query)
#         response = llm_chain.run(question=query, knowledge_base=processed_knowledge_base)
#         return {"answer": response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/chatwithai")
async def chatwithai(request: Request):
    body = await request.json()
    query = body["query"].lower()
    tokens = query.split()
    if "graph" in tokens or "chart" in tokens or "plot" in tokens or "show" in tokens:
        plotData(query)
        return "Plotted"
    elif "ping" in tokens or "mail" in tokens:
        if "ping" in tokens:
            ind = tokens.index("mail")
            email = tokens[ind+1]
            res = await sendmail(email)
            return "Mail sent"
        else:
            ind = tokens.index("at")
            email = tokens[ind+1]
            res = await sendmail(email)
            return "Mail sent"
    else:
        print(AGENT_DATA)
        preprocessed_query = f"Web3 data: {AGENT_DATA} | User query: {query}. Give the links of courses from different sources. For ex: Udemy/Coursers course on that particular skillset he needs to upskill himself in and provide a concrete reasoning as to why he needs to upskill in that field. The wallet address in the query should match any one in the 'User or Wallet Address' field in the dictionary mapping. For ex: Wallet Address in the list at index 1 means that the count of certificates of user in python is the count at 'Python[1]' in the data.Generate the text in plain text format without '*' and without new lines."
        return getChat(preprocessed_query)
    
    
def plotData(query: str):
    data = pd.DataFrame(AGENT_DATA)
    agent = Agent(data)
    agent.chat(query)
    
# @app.get("/finetune")
# async def finetune():
#     dataset = """{{"prompt": "what is ai", "completion": "ai is also called artificial intelligence. where machines can think on their own"},{"prompt": "<prompt text>", "completion": "<ideal generated text>"},{"prompt": "<prompt text>", "completion": "<ideal generated text>"}}"""
#     # dataset = str(dataset)
#     response = model.generate_content(f"Consider this query just for fine tuning. The dataset here is: {dataset}. I don't want any response in return.")
#     return response.text
        

if __name__ == "__main__":
    uvicorn.run("main:app", port=8001, log_level="info", reload=True)
