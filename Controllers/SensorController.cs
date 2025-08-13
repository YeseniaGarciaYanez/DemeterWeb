<<<<<<< HEAD
using Demeter.API.Data;
using Demeter.API.DTOs.Sensor;
using Demeter.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
=======
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demeter.API.Data;
using Demeter.API.Models;
using Microsoft.AspNetCore.Http;
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed

namespace Demeter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SensorController : ControllerBase
    {
        private readonly DemeterContext _context;

<<<<<<< HEAD
        public SensorController(DemeterContext context) => _context = context;

        [HttpGet("records/{cropId}/{sensorId}")]
        public async Task<IActionResult> GetRecords(int cropId, int sensorId, [FromQuery] int hours = 24)
        {
            try
            {
                var cutoff = DateTime.UtcNow.AddHours(-hours);

                var records = await _context.SensorRecords
                    .Where(r => r.crop_id == cropId &&
                               r.sensor_id == sensorId &&
                               r.timestamp >= cutoff)
                    .OrderBy(r => r.timestamp)
                    .Select(r => new SensorRecordDto
                    {
                        id = r.id,
                        crop_id = r.crop_id,
                        sensor_id = r.sensor_id,
                        value = (double)r.value,
                        timestamp = r.timestamp
                    })
                    .ToListAsync();

                return Ok(records);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpPost("records")]
        public async Task<IActionResult> CreateRecord([FromBody] SensorRecordRequest request)
        {
            var record = new SensorRecord
            {
                crop_id = request.crop_id,
                sensor_id = request.sensor_id,
                value = request.value, // Conversión explícita
                timestamp = DateTime.UtcNow
            };

            _context.SensorRecords.Add(record);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecords), new { cropId = request.crop_id, sensorId = request.sensor_id }, record);

        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestRecords()
        {
            try
            {
                // Lista de sensores que queremos mostrar en el layout
                int[] sensorIdsToInclude = { 1, 5 }; // 1=temperature, 5=waterLevel

                // Obtener el último registro por crop_id y sensor_id para los sensores indicados
                var latestRecords = await _context.SensorRecords
                    .Where(r => sensorIdsToInclude.Contains(r.sensor_id))
                    .GroupBy(r => new { r.crop_id, r.sensor_id })
                    .Select(g => g.OrderByDescending(r => r.timestamp).FirstOrDefault())
                    .ToListAsync();

                var result = latestRecords.Select(r => new SensorRecordDto
                {
                    id = r.id,
                    crop_id = r.crop_id,
                    sensor_id = r.sensor_id,
                    value = (double)r.value,
                    timestamp = r.timestamp
                });

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

    }
}
=======
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

>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
