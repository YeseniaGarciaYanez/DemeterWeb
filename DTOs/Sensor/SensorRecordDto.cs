namespace Demeter.API.DTOs.Sensor;

public class SensorRecordDto
{
    public int id { get; set; }
    public int crop_id { get; set; }
    public int sensor_id { get; set; }
    public double value { get; set; }
    public DateTime timestamp { get; set; }
}