using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Demeter.API.Models
{
    [Table("Crop_Farmer")] // Especifica el nombre exacto de la tabla
    public class Crop_Farmer
    {
        public int crop_id { get; set; }
        public int farmer_id { get; set; }

        public virtual Crop Crop { get; set; } = null!;
        public virtual Farmer Farmer { get; set; } = null!;
    }
}