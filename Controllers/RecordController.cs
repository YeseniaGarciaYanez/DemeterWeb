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
            return Ok(record);
        }

        [HttpGet("by-sensor/{sensorId}")]
        public async Task<IActionResult> GetBySensor(int sensorId)
        {
            var records = await _context.SensorRecords
                .Where(r => r.SensorId == sensorId)
                .OrderByDescending(r => r.Timestamp)
                .Take(50)
                .ToListAsync();

            return Ok(records);
        }
    }
}