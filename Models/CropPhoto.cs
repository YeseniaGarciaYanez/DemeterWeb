namespace Demeter.API.Models
{
    public class CropPhoto
    {
<<<<<<< HEAD
        public int id { get; set; }
        public int crop_id { get; set; }
        public Crop? Crop { get; set; }
        public string image_path { get; set; } = "";
        public DateTime uploaded_at { get; set; } = DateTime.Now;
    }
}
=======
        public int Id { get; set; }
        public int CropId { get; set; }
        public Crop? Crop { get; set; }

        public string ImagePath { get; set; } = "";
        public DateTime UploadedAt { get; set; } = DateTime.Now;
    }
}
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
