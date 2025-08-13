using Demeter.API.Data;
using Demeter.API.DTOs.Sensor;
using Demeter.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Demeter.API.Controllers
{
    [Route("api/sensorrecords")]
    [ApiController]
    public class SensorRecordsController : ControllerBase
    {
        private readonly DemeterContext _context;

        public SensorRecordsController(DemeterContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<SensorRecord>> CreateRecord([FromBody] SensorRecordRequest request)
        {
            var newRecord = new SensorRecord
            {
                crop_id = request.crop_id,
                sensor_id = request.sensor_id,
                value = request.value,
                timestamp = DateTime.UtcNow // Corregida la fecha/hora
            };

            _context.SensorRecords.Add(newRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecords), new { id = newRecord.id }, newRecord);
        }

        [HttpGet("{cropId}/{sensorId}")]
        public async Task<ActionResult<IEnumerable<SensorRecordDto>>> GetRecords(
            int cropId, int sensorId, [FromQuery] int hours = 24)
        {
            var cutoff = DateTime.Now.AddHours(-hours);

            var records = await _context.SensorRecords
                .Where(r => r.crop_id == cropId && r.sensor_id == sensorId && r.timestamp >= cutoff)
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
    }
}
