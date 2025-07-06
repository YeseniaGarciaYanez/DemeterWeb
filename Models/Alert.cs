namespace Demeter.API.Models
{
    public class Alert
    {
        public int Id { get; set; }
        public int CropId { get; set; }
        public Crop? Crop { get; set; }

        public int SensorId { get; set; }
        public Sensor? Sensor { get; set; }

        public string Severity { get; set; } = "green"; // green, yellow, red
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
