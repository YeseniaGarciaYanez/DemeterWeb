using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demeter.API.Data;
using Demeter.API.Models;
using Microsoft.AspNetCore.Http;

namespace Demeter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecordController : ControllerBase
    {
        private readonly DemeterContext _context;

        public RecordController(DemeterContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create(SensorRecord record)
        {
            // Validar que el valor no sea nulo
<<<<<<< HEAD
            if (record.value == null)
                return BadRequest("El valor del sensor no puede ser nulo.");

            record.timestamp = DateTime.Now;
            _context.SensorRecords.Add(record);
            await _context.SaveChangesAsync();

            var threshold = await _context.AlertThreshold
                .FirstOrDefaultAsync(t => t.sensor_id == record.sensor_id);

            if (threshold != null)
            {
                string severity = "green";
                float safeValue = (float)record.value.Value;

                if (safeValue < threshold.min_value || safeValue > threshold.max_value)
                {
                    severity = Math.Abs(safeValue - threshold.min_value) > 5 ? "red" : "yellow";

                    _context.Alert.Add(new Alert
                    {
                        crop_id = record.crop_id,
                        sensor_id = record.sensor_id,
                        severity = severity,
                        description = $"Valor fuera de rango: {safeValue}",
                        created_at = DateTime.Now
                    });

                    await _context.SaveChangesAsync();
                }
            }
=======
            if (record.Value == null)
                return BadRequest("El valor del sensor no puede ser nulo.");

            record.Timestamp = DateTime.Now;
            _context.SensorRecords.Add(record);
            await _context.SaveChangesAsync();

            var threshold = await _context.AlertThresholds
                .FirstOrDefaultAsync(t => t.SensorId == record.SensorId);

            if (threshold != null)
{
    string severity = "green";
    decimal safeValue = (decimal)record.Value.Value;

    if (safeValue < threshold.MinValue || safeValue > threshold.MaxValue)
    {
        severity = Math.Abs(safeValue - threshold.MinValue) > 5 ? "red" : "yellow";

        _context.Alerts.Add(new Alert
        {
            CropId = record.CropId,
            SensorId = record.SensorId,
            Severity = severity,
            Description = $"Valor fuera de rango: {safeValue}",
            CreatedAt = DateTime.Now
        });

        await _context.SaveChangesAsync();
    }
}
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
            return Ok(record);
        }

        [HttpGet("by-sensor/{sensorId}")]
<<<<<<< HEAD
        public async Task<IActionResult> GetBySensor(int sensor_id)
        {
            var records = await _context.SensorRecords
                .Where(r => r.sensor_id == sensor_id)
                .OrderByDescending(r => r.timestamp)
=======
        public async Task<IActionResult> GetBySensor(int sensorId)
        {
            var records = await _context.SensorRecords
                .Where(r => r.SensorId == sensorId)
                .OrderByDescending(r => r.Timestamp)
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
                .Take(50)
                .ToListAsync();

            return Ok(records);
        }
    }
<<<<<<< HEAD
}

=======
}
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
