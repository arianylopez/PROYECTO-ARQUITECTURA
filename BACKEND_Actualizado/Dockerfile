FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["PortalInfoSoftware.API/PortalInfoSoftware.API.csproj", "PortalInfoSoftware.API/"]
COPY ["PortalInfoSoftware.Application/PortalInfoSoftware.Application.csproj", "PortalInfoSoftware.Application/"]
COPY ["PortalInfoSoftware.Domain/PortalInfoSoftware.Domain.csproj", "PortalInfoSoftware.Domain/"]
COPY ["PortalInfoSoftware.Infrastructure/PortalInfoSoftware.Infrastructure.csproj", "PortalInfoSoftware.Infrastructure/"]

RUN dotnet restore "./PortalInfoSoftware.API/PortalInfoSoftware.API.csproj"

COPY . .
WORKDIR "/src/PortalInfoSoftware.API"
RUN dotnet build "./PortalInfoSoftware.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./PortalInfoSoftware.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PortalInfoSoftware.API.dll"]