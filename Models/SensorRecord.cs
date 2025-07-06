namespace Demeter.API.Models
{
    public class SensorRecord
    {
        public int Id { get; set; }
        public int CropId { get; set; }
        public Crop? Crop { get; set; }

        public int SensorId { get; set; }
        public Sensor? Sensor { get; set; }

        public float? Value { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
