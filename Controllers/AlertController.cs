using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demeter.API.Data;
using Demeter.API.Models;
using Microsoft.AspNetCore.Http;

namespace Demeter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlertController : ControllerBase
    {
        private readonly DemeterContext _context;

        public AlertController(DemeterContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var alerts = await _context.Alerts
                .OrderByDescending(a => a.CreatedAt)
                .Take(50)
                .ToListAsync();

            return Ok(alerts);
        }
    }
}
