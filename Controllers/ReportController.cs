using Microsoft.AspNetCore.Mvc;
using Demeter.API.Data;
using Demeter.API.Models;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> Create(Report report)
        {
            report.CreatedAt = DateTime.Now;
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();
            return Ok(report);
        }

        [HttpPost("generate-pdf")]
        public IActionResult GeneratePDF([FromBody] Report report)
        {
            using var ms = new MemoryStream();
            var writer = new PdfWriter(ms);
            var pdf = new PdfDocument(writer);
            var doc = new Document(pdf);

            doc.Add(new Paragraph("🌱 Deméter - Reporte de Cultivo 🌱"));
            doc.Add(new Paragraph($"Fecha: {DateTime.Now:dd/MM/yyyy HH:mm}"));
            doc.Add(new Paragraph($"Tipo de reporte: {report.Type}"));
            doc.Add(new Paragraph($"Descripción: {report.Description}"));

            doc.Close();
            return File(ms.ToArray(), "application/pdf", "ReporteDemeter.pdf");
        }
    }
}
