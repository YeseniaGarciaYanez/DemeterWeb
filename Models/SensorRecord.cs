namespace Demeter.API.Models
{
    public class SensorRecord
    {
<<<<<<< HEAD
        public int id { get; set; }
        public int crop_id { get; set; }
        public Crop? Crop { get; set; }

        public int sensor_id { get; set; }
        public Sensor? Sensor { get; set; }

        public double? value { get; set; }
        public DateTime timestamp { get; set; } = DateTime.Now;
    }
}
=======
        public int Id { get; set; }
        public int CropId { get; set; }
        public Crop? Crop { get; set; }

        public int SensorId { get; set; }
        public Sensor? Sensor { get; set; }

        public float? Value { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
