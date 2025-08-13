<<<<<<< HEAD
using Demeter.API.Data;
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
    public class AlertController : ControllerBase
    {
        private readonly DemeterContext _context;
<<<<<<< HEAD
        private readonly ILogger<AlertController> _logger;

        public AlertController(DemeterContext context, ILogger<AlertController> logger)
        {
            _context = context;
            _logger = logger;
=======

        public AlertController(DemeterContext context)
        {
            _context = context;
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
<<<<<<< HEAD
            try
            {
                var alerts = await _context.Alert
                    .Include(a => a.Crop)
                    .Include(a => a.Sensor)
                    .OrderByDescending(a => a.created_at)
                    .Take(50)
                    .Select(a => new
                    {
                        a.id,
                        a.crop_id,
                        CropName = a.Crop.name,
                        a.sensor_id,
                        SensorName = a.Sensor.name,
                        SensorUnit = a.Sensor.unit,
                        a.severity,
                        a.description,
                        a.created_at
                    })
                    .ToListAsync();

                return Ok(alerts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener alertas");
                return StatusCode(500, "Error interno del servidor");
            }
        }

        [HttpGet("by-crop/{cropId}")]
        public async Task<IActionResult> GetByCrop(int cropId)
        {
            try
            {
                var alerts = await _context.Alert
                    .Include(a => a.Sensor)
                    .Where(a => a.crop_id == cropId)
                    .OrderByDescending(a => a.created_at)
                    .Take(10)
                    .Select(a => new
                    {
                        a.id,
                        a.sensor_id,
                        SensorName = a.Sensor.name,
                        SensorUnit = a.Sensor.unit,
                        a.severity,
                        a.description,
                        a.created_at
                    })
                    .ToListAsync();

                return Ok(alerts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener alertas para cultivo {cropId}");
                return StatusCode(500, "Error interno del servidor");
            }
        }

        [HttpGet("current-status/{cropId}")]
        public async Task<IActionResult> GetCurrentStatus(int cropId)
        {
            try
            {
                var sensors = await _context.Sensors.ToListAsync();
                var status = new List<object>();

                foreach (var sensor in sensors)
                {
                    var latestRecord = await _context.SensorRecords
                        .Where(r => r.crop_id == cropId && r.sensor_id == sensor.id)
                        .OrderByDescending(r => r.timestamp)
                        .FirstOrDefaultAsync();

                    if (latestRecord != null)
                    {
                        var threshold = await _context.AlertThreshold
                            .FirstOrDefaultAsync(t => t.sensor_id == sensor.id);

                        string statusLevel = "normal";
                        if (threshold != null)
                        {
                            double value = latestRecord.value ?? 0;
                            if (value < threshold.min_value)
                            {
                                statusLevel = (threshold.min_value - value) > (threshold.max_value - threshold.min_value) * 0.2
                                    ? "critical"
                                    : "warning";
                            }
                            else if (value > threshold.max_value)
                            {
                                statusLevel = (value - threshold.max_value) > (threshold.max_value - threshold.min_value) * 0.2
                                    ? "critical"
                                    : "warning";
                            }
                        }

                        status.Add(new
                        {
                            sensor_id = sensor.id,
                            sensor_name = sensor.name,
                            value = latestRecord.value,
                            unit = sensor.unit,
                            status = statusLevel,
                            timestamp = latestRecord.timestamp
                        });
                    }
                }

                return Ok(status);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener estado actual para cultivo {cropId}");
                return StatusCode(500, "Error interno del servidor");
            }
        }
    }
}
=======
            var alerts = await _context.Alerts
                .OrderByDescending(a => a.CreatedAt)
                .Take(50)
                .ToListAsync();

            return Ok(alerts);
        }
    }
}
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
