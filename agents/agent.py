from langchain_openai import ChatOpenAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv
from tools import tools
import os

load_dotenv()

# ============================================
# 1. LE MODELE — connexion à OpenRouter
# ============================================
llm = ChatOpenAI(
    model=os.getenv("LLM_MODEL"),
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base=os.getenv("OPENROUTER_BASE_URL"),
)

# ============================================
# 2. LE PROMPT SYSTEME — le "caractère" de l'IA
# ============================================
prompt = ChatPromptTemplate.from_messages([
    ("system", """
Tu es un assistant de réservation de logements sympathique et efficace.
Tu aides les utilisateurs à trouver et réserver des logements en parlant naturellement.

Règles :
- Pose des questions si des informations manquent (ville, dates, nb personnes)
- Présente toujours les logements de façon claire et lisible
- Ne crée JAMAIS une réservation sans confirmation explicite de l'utilisateur
- Réponds toujours en français
"""),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

# ============================================
# 3. LA MEMOIRE — retient le contexte de la conversation
# ============================================
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# ============================================
# 4. L'AGENT — assemble tout ensemble
# ============================================
agent = create_tool_calling_agent(llm, tools, prompt)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    memory=memory,
    verbose=True,       # affiche le raisonnement de l'IA dans le terminal
    max_iterations=5,
)

# ============================================
# 5. FONCTION PRINCIPALE — à appeler depuis main.py
# ============================================
def chat(message: str) -> str:
    result = agent_executor.invoke({"input": message})
    return result["output"]
