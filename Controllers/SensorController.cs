using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demeter.API.Data;
using Demeter.API.Models;
using Microsoft.AspNetCore.Http;

namespace Demeter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SensorController : ControllerBase
    {
        private readonly DemeterContext _context;

        public SensorController(DemeterContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sensor>>> GetAll()
        {
            return await _context.Sensors.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Sensor sensor)
        {
            _context.Sensors.Add(sensor);
            await _context.SaveChangesAsync();
            return Ok(sensor);
        }
    }
}

