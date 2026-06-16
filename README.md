# Portal Web de Carreras Tecnológicas - UCB Santa Cruz (Ingeniería de Software)

## 📖 Descripción del Proyecto
Este repositorio contiene el código fuente y el diseño arquitectónico del **Portal Web de Carreras Tecnológicas** enfocado en la carrera de Ingeniería de Software de la Universidad Católica Boliviana "San Pablo" (Sede Santa Cruz). 

El proyecto resuelve la fragmentación de la información académica, convirtiendo un portal estático en un ecosistema dinámico (Recurso Vivo). Permite a los estudiantes, docentes y aspirantes acceder a mallas curriculares interactivas, perfiles docentes, agenda de eventos y administración de contenido de la comunidad.

## 🏗️ Arquitectura del Sistema
El sistema está construido bajo un enfoque estricto de **Clean Architecture** (Arquitectura Limpia), implementando un patrón de **Monolito Modular** para asegurar alta mantenibilidad, escalabilidad y separación de responsabilidades lógicas.

* **Frontend (Capa de Presentación):** Single Page Application (SPA) altamente optimizada, construida con **React** y empaquetada con Vite. Diseño enfocado en estrategia *Mobile-First*.
* **Backend (Core de Negocio):** API RESTful desarrollada en **C# .NET 8**, dividida en capas estructurales lógicas (`Domain`, `Application`, `Infrastructure`, `API`). Hace uso intensivo de abstracciones y patrones de diseño (Facade, Factory, Strategy, Repository).
* **Base de Datos:** Motor relacional **PostgreSQL**, gestionado y versionado a través de Entity Framework Core mediante metodologías Code-First.

## 🚀 Módulos Principales
* 🎓 **Módulo Académico:** Visualización de malla curricular interactiva, materias, prerrequisitos reales y planes de estudios.
* 👥 **Módulo Comunidad:** Directorio detallado de docentes y sus áreas de especialización técnica.
* 📅 **Módulo Eventos:** Gestión y filtrado de eventos de la carrera (próximos e históricos) implementados mediante el patrón de diseño *Strategy*.
* 📝 **Módulo CMS (Blog y Vida Estudiantil):** Gestión de artículos de divulgación tecnológica, galería multimedia y testimonios estudiantiles.
* 🔐 **Módulo de Seguridad:** Autenticación y autorización transaccional basada en JSON Web Tokens (JWT) y Data Transfer Objects (DTOs) para aislar la Información Personal Identificable (PII).

## ⚙️ Requisitos Previos
Para desplegar este proyecto en tu entorno local, necesitas tener instalado:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Recomendado)
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Node.js 18+](https://nodejs.org/)
* [PostgreSQL 15+](https://www.postgresql.org/)

## 🛠️ Instalación y Ejecución

### Opción 1: Despliegue en Contenedores (Docker)
El proyecto cuenta con un `Dockerfile` configurado para contenerizar el backend rápidamente.
```bash
# 1. Clonar el repositorio
git clone [https://github.com/d4ri4na/proyecto-arquitectura.git](https://github.com/d4ri4na/proyecto-arquitectura.git)
cd proyecto-arquitectura

# 2. Construir la imagen de Docker
docker build -t portal-ucb-backend ./BACKEND_Actualizado

# 3. Ejecutar el contenedor
docker run -d -p 5000:80 portal-ucb-backend

```

### Opción 2: Ejecución Local de Desarrollo

**1. Levantar el Backend (.NET)**

```bash
cd BACKEND_Actualizado/PortalInfoSoftware.API
dotnet restore
dotnet run

```

*La API estará disponible en `http://localhost:5000` o en el puerto especificado en tu `launchSettings.json`.*

**2. Levantar el Frontend (React)**

```bash
cd portal-software-ucb
npm install
npm run dev

```

*La aplicación web estará disponible en `http://localhost:5173`.*

## 🧪 Calidad, Pruebas y Seguridad (QA)

Este repositorio fue auditado para cumplir con rigurosos atributos de calidad (ISO 25010) probados empíricamente:

* **Mantenibilidad y Deuda Técnica:** Análisis de código estático continuo y automatizado integrado con **SonarCloud** (Calificación A en Fiabilidad, Seguridad y Mantenibilidad. 0 Bugs detectados).
* **Rendimiento y Escalabilidad:** Pruebas de esfuerzo y concurrencia automatizadas con **Apache JMeter**. Tiempo de respuesta de latencia backend de **~35ms**. Rendimiento del frontend optimizado para un *Largest Contentful Paint* (LCP) < 2 segundos.
* **Ciberseguridad:** Escaneo dinámico automatizado de vulnerabilidades validado con **OWASP ZAP**. Endpoints del CMS blindados contra Mutaciones y formularios protegidos contra Inyecciones SQL.
* **DevOps:** Pipeline de Integración Continua (CI/CD) administrado por flujos automatizados de **GitHub Actions**.

## Documentación: 
https://docs.google.com/document/d/172K4bV8w1_p03-Bm8poWAKvKP5hri-hfx02RyFwHKxg/edit?usp=sharing

```
