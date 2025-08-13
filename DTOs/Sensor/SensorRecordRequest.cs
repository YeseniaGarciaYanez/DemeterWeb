namespace Demeter.API.DTOs.Sensor;

public class SensorRecordRequest
{
    public int crop_id { get; set; }
    public int sensor_id { get; set; }
    public double value { get; set; }
}