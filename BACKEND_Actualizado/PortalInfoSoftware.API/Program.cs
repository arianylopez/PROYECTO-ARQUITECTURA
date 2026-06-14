using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PortalInfoSoftware.Infrastructure.Persistence;
using PortalInfoSoftware.Infrastructure.Seeders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IMallaRepository, PortalInfoSoftware.Infrastructure.Repositories.MallaRepository>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IMallaService, PortalInfoSoftware.Application.Services.MallaService>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IAuthRepository, PortalInfoSoftware.Infrastructure.Repositories.AuthRepository>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IAuthService, PortalInfoSoftware.Application.Services.AuthService>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IDocentesRepository, PortalInfoSoftware.Infrastructure.Repositories.DocentesRepository>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IDocentesService, PortalInfoSoftware.Application.Services.DocentesService>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IEventosRepository, PortalInfoSoftware.Infrastructure.Repositories.EventosRepository>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IEventosService, PortalInfoSoftware.Application.Services.EventosService>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IArticulosRepository, PortalInfoSoftware.Infrastructure.Repositories.ArticulosRepository>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IArticulosService, PortalInfoSoftware.Application.Services.ArticulosService>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IVidaEstudiantilRepository, PortalInfoSoftware.Infrastructure.Repositories.VidaEstudiantilRepository>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IVidaEstudiantilService, PortalInfoSoftware.Application.Services.VidaEstudiantilService>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IInformacionRepository, PortalInfoSoftware.Infrastructure.Repositories.InformacionRepository>();
builder.Services.AddScoped<PortalInfoSoftware.Application.Interfaces.IInformacionService, PortalInfoSoftware.Application.Services.InformacionService>();


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
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate();
        await DataSeeder.SeedAsync(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocurrió un error.");
    }
}

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