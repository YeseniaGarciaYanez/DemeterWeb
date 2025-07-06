namespace Demeter.API.Models
{
    public class CropPhoto
    {
        public int Id { get; set; }
        public int CropId { get; set; }
        public Crop? Crop { get; set; }

        public string ImagePath { get; set; } = "";
        public DateTime UploadedAt { get; set; } = DateTime.Now;
    }
}
