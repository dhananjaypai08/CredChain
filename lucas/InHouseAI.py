# Fastapi imports 
from fastapi import APIRouter
# Model imports 
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

router = APIRouter()


# Load pre-trained model and tokenizer
# model_name = "gpt2"
# model = GPT2LMHeadModel.from_pretrained(model_name)
# tokenizer = GPT2Tokenizer.from_pretrained(model_name,  clean_up_tokenization_spaces=True)
# Load the model and tokenizer
model_name = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name, clean_up_tokenization_spaces=True)

print(f"Loading model: {model_name}")
# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
print(f"Model loaded and moved to {device}")

# Function to generate response
def generate_response(prompt, max_length=250):
    input_ids = tokenizer.encode(prompt, return_tensors="pt").to(device)
    
    # Generate response
    output = model.generate(
        input_ids,
        max_length=max_length,
        num_return_sequences=1,
        no_repeat_ngram_size=2,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        temperature=0.7
    )
    
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    return response

# Sample knowledge base (replace with your actual data)
knowledge_base = {
    "0x8c9c46f67d5061c63829fdF37EAdF51E213BFEcb": ["Python Certificate", "Java Certificate"],
    "0xDBD7D4c5FD65a257a4e333D9C196E0775bedDdE8": ["AI Certificate", "Web Development Certificate"],
}

# @router.get("/chatwithai")
# Modified chat route
def chat(query: str):
    # from main import knowledge_base
    preprocessed_query = f"Web3 data: {knowledge_base} | User query: {query}"
    response = generate_response(preprocessed_query)
    # print(type(response), response)
    return response
print(chat(input('Enter the query: ')))