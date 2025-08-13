namespace Demeter.API.Models
{
    public class Report
    {
<<<<<<< HEAD
        public int id { get; set; }
        public int crop_id { get; set; }
        public Crop? Crop { get; set; }
        public int farmer_id { get; set; } // Unificado a snake_case
        public Farmer? Farmer { get; set; }
        public string type { get; set; } = ""; // Cambiado a minúsculas
        public string? description { get; set; }
        public DateTime created_at { get; set; } = DateTime.Now; // Unificado a snake_case
    }
}
=======
        public int Id { get; set; }
        public int CropId { get; set; }
        public Crop? Crop { get; set; }

        public int FarmerId { get; set; }
        public Farmer? Farmer { get; set; }

        public string Type { get; set; } = "";
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
