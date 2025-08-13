<<<<<<< HEAD
using Demeter.API.Data;
using Demeter.API.DTOs.Report;
=======
using Microsoft.AspNetCore.Mvc;
using Demeter.API.Data;
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
using Demeter.API.Models;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
<<<<<<< HEAD
using Microsoft.AspNetCore.Mvc;
=======
using Microsoft.AspNetCore.Http;
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
using Microsoft.EntityFrameworkCore;

namespace Demeter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly DemeterContext _context;

        public ReportController(DemeterContext context)
        {
            _context = context;
        }

        [HttpPost]
<<<<<<< HEAD
        public async Task<IActionResult> Create([FromBody] ReportDto reportDto)
        {
            var report = new Report
            {
                crop_id = reportDto.crop_id,
                farmer_id = reportDto.farmer_id,
                type = reportDto.type,
                description = reportDto.description,
                created_at = DateTime.Now
            };

=======
        public async Task<IActionResult> Create(Report report)
        {
            report.CreatedAt = DateTime.Now;
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();
            return Ok(report);
        }

        [HttpPost("generate-pdf")]
<<<<<<< HEAD
        public IActionResult GeneratePDF([FromBody] ReportDto reportDto)
=======
        public IActionResult GeneratePDF([FromBody] Report report)
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
        {
            using var ms = new MemoryStream();
            var writer = new PdfWriter(ms);
            var pdf = new PdfDocument(writer);
            var doc = new Document(pdf);

            doc.Add(new Paragraph("🌱 Deméter - Reporte de Cultivo 🌱"));
            doc.Add(new Paragraph($"Fecha: {DateTime.Now:dd/MM/yyyy HH:mm}"));
<<<<<<< HEAD
            doc.Add(new Paragraph($"Tipo de reporte: {reportDto.type}"));
            doc.Add(new Paragraph($"Descripción: {reportDto.description}"));
=======
            doc.Add(new Paragraph($"Tipo de reporte: {report.Type}"));
            doc.Add(new Paragraph($"Descripción: {report.Description}"));
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed

            doc.Close();
            return File(ms.ToArray(), "application/pdf", "ReporteDemeter.pdf");
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
