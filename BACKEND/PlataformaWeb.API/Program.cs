using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PlataformaWeb.API.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar la conexión a PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString)
           .UseSnakeCaseNamingConvention());

// 2. Configurar Autenticación JWT
var jwtKey = builder.Configuration["Jwt:Key"];
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!))
        };
    });

// 3. Inyección de Dependencias
builder.Services.AddScoped<PlataformaWeb.API.Repositories.IAsignaturaRepository, PlataformaWeb.API.Repositories.AsignaturaRepository>();
builder.Services.AddScoped<PlataformaWeb.API.Services.IAcademicFacade, PlataformaWeb.API.Services.AcademicFacade>();

builder.Services.AddScoped<PlataformaWeb.API.Repositories.IPostRepository, PlataformaWeb.API.Repositories.PostRepository>();
builder.Services.AddScoped<PlataformaWeb.API.Services.IContentFacade, PlataformaWeb.API.Services.ContentFacade>();

builder.Services.AddScoped<PlataformaWeb.API.Repositories.ICommunityRepository, PlataformaWeb.API.Repositories.CommunityRepository>();
builder.Services.AddScoped<PlataformaWeb.API.Services.ICommunityFacade, PlataformaWeb.API.Services.CommunityFacade>();

builder.Services.AddScoped<PlataformaWeb.API.Repositories.IMultimediaRepository, PlataformaWeb.API.Repositories.MultimediaRepository>();
builder.Services.AddScoped<PlataformaWeb.API.Services.IMultimediaFacade, PlataformaWeb.API.Services.MultimediaFacade>();

builder.Services.AddScoped<PlataformaWeb.API.Repositories.IUserRepository, PlataformaWeb.API.Repositories.UserRepository>();
builder.Services.AddScoped<PlataformaWeb.API.Services.IAuthFacade, PlataformaWeb.API.Services.AuthFacade>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// 4. Configurar Swagger 
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
var app = builder.Build();

app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();