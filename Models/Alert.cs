namespace Demeter.API.Models
{
    public class Alert
    {
<<<<<<< HEAD
        public int id { get; set; }
        public int crop_id { get; set; }
        public Crop? Crop { get; set; }
        public int sensor_id { get; set; }
        public Sensor? Sensor { get; set; }
        public string severity { get; set; } = "green";
        public string? description { get; set; }
        public DateTime created_at { get; set; } = DateTime.Now;
    }
}
=======
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
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
