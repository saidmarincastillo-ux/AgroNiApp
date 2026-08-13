using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace AgroNi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public SettingsController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpPost("logo")]
        public async Task<IActionResult> UploadLogo(IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
                return BadRequest("No se proporcionó imagen.");

            var uploadsFolder = Path.Combine(_env.WebRootPath, "images");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);
            
            // Sobrescribe siempre logo.png
            var filePath = Path.Combine(uploadsFolder, "logo.png");

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return Ok(new { url = $"/images/logo.png?t={DateTime.Now.Ticks}" });
        }
    }
}
