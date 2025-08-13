namespace Demeter.API.Models
{
    public class Crop
    {
<<<<<<< HEAD
        public int id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public DateTime? start_date { get; set; }
        public int area_id { get; set; }
        public Area Area { get; set; }
        public ICollection<SensorRecord> SensorRecords { get; set; }
    }
}
=======
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string? Type { get; set; }
        public DateTime? StartDate { get; set; }
        public int AreaId { get; set; }
        public Area? Area { get; set; }
    }
}
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
