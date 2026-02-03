from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str = Field(..., min_length=10, max_length=1000)

class ContactMessageResponse(BaseModel):
    success: bool
    message: str

# Services data
SERVICES = {
    "manicuras": {
        "title_es": "Manicuras",
        "title_en": "Manicures",
        "items": [
            {"name_es": "Manicura y esmalte normal", "name_en": "Basic manicure and polish", "price": 6},
            {"name_es": "Manicura y esmalte permanente", "name_en": "Gel manicure", "price": 12},
            {"name_es": "Uñas de porcelana y gel", "name_en": "Porcelain and gel nails", "price": 20},
        ]
    },
    "pedicuras": {
        "title_es": "Pedicuras",
        "title_en": "Pedicures",
        "items": [
            {"name_es": "Pedicura y esmalte normal", "name_en": "Basic pedicure and polish", "price": 15},
            {"name_es": "Pedicura y esmalte permanente", "name_en": "Gel pedicure", "price": 22},
            {"name_es": "Sólo cortar uñas de pies", "name_en": "Toenail trim only", "price": 6},
            {"name_es": "Sólo pedicura sin maquillar", "name_en": "Pedicure without polish", "price": 10},
        ]
    },
    "pestanas": {
        "title_es": "Pestañas",
        "title_en": "Eyelashes",
        "items": [
            {"name_es": "Lifting de pestañas", "name_en": "Lash lift", "price": 28},
            {"name_es": "Extensiones de pestañas", "name_en": "Lash extensions", "price": 32},
            {"name_es": "Tinte de pestañas", "name_en": "Lash tint", "price": 6},
        ]
    },
    "facial": {
        "title_es": "Facial",
        "title_en": "Facial",
        "items": [
            {"name_es": "Limpieza de cutis con vapor y extracción", "name_en": "Deep cleansing facial with steam and extraction", "price": 28},
        ]
    },
    "depilacion": {
        "title_es": "Depilación con cera",
        "title_en": "Waxing",
        "items": [
            {"name_es": "Cejas (pinza o cera)", "name_en": "Eyebrows (tweezing or wax)", "price": 5},
            {"name_es": "Naríz", "name_en": "Nose", "price": 3},
            {"name_es": "Bozo", "name_en": "Upper lip", "price": 3},
            {"name_es": "Axilas", "name_en": "Underarms", "price": 6},
            {"name_es": "Brazos", "name_en": "Arms", "price": 8},
            {"name_es": "Medias Piernas", "name_en": "Half legs", "price": 8},
            {"name_es": "Piernas completas", "name_en": "Full legs", "price": 15},
            {"name_es": "Ingles normales", "name_en": "Standard bikini", "price": 8},
            {"name_es": "Ingles brasileñas", "name_en": "Brazilian bikini", "price": 12},
            {"name_es": "Ingles integrales", "name_en": "Full bikini", "price": 15},
            {"name_es": "Glúteos", "name_en": "Buttocks", "price": 8},
            {"name_es": "Zona perianal", "name_en": "Perianal area", "price": 8},
            {"name_es": "Pecho y abdomen", "name_en": "Chest and abdomen", "price": 15},
            {"name_es": "Línea alba", "name_en": "Happy trail", "price": 5},
        ]
    },
    "micropigmentacion": {
        "title_es": "Micropigmentación",
        "title_en": "Micropigmentation",
        "items": [
            {"name_es": "Técnica de cejas Microblading", "name_en": "Eyebrow Microblading", "price": 240},
            {"name_es": "Técnica para cejas Efecto Polvo", "name_en": "Powder Brows technique", "price": 240},
            {"name_es": "Técnica para labios Microlips", "name_en": "Microlips lip technique", "price": 240},
            {"name_es": "Técnica para labios Perfilado", "name_en": "Lip liner technique", "price": 180},
        ]
    }
}

# Gallery data
GALLERY = [
    {
        "id": "1",
        "title_es": "Uñas Artísticas",
        "title_en": "Artistic Nails",
        "category": "manicuras",
        "image": "https://customer-assets.emergentagent.com/job_a6a0678e-59b4-4285-ad29-5f51859be8f2/artifacts/azph45qx_WhatsApp%20Image%202026-02-03%20at%2008.49.41%20%281%29.jpeg",
        "type": "after"
    },
    {
        "id": "2",
        "title_es": "Antes del Tratamiento",
        "title_en": "Before Treatment",
        "category": "manicuras",
        "image": "https://customer-assets.emergentagent.com/job_a6a0678e-59b4-4285-ad29-5f51859be8f2/artifacts/zf7cikrb_WhatsApp%20Image%202026-02-03%20at%2008.49.41.jpeg",
        "type": "before"
    },
    {
        "id": "3",
        "title_es": "Micropigmentación de Cejas",
        "title_en": "Eyebrow Micropigmentation",
        "category": "micropigmentacion",
        "image": "https://customer-assets.emergentagent.com/job_a6a0678e-59b4-4285-ad29-5f51859be8f2/artifacts/kp74lvrz_WhatsApp%20Image%202026-02-03%20at%2008.53.19.jpeg",
        "type": "result"
    }
]

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Rosa Pérez - Estética & Micropigmentación API"}

@api_router.get("/services")
async def get_services():
    return SERVICES

@api_router.get("/gallery")
async def get_gallery():
    return GALLERY

@api_router.post("/contact", response_model=ContactMessageResponse)
async def submit_contact(input: ContactMessageCreate):
    try:
        contact_obj = ContactMessage(**input.model_dump())
        doc = contact_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.contact_messages.insert_one(doc)
        
        return ContactMessageResponse(
            success=True,
            message="Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto."
        )
    except Exception as e:
        logging.error(f"Error saving contact message: {e}")
        raise HTTPException(status_code=500, detail="Error al enviar el mensaje")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    for msg in messages:
        if isinstance(msg['timestamp'], str):
            msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
    return messages

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
