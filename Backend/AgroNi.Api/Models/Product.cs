namespace AgroNi.Api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Tipo { get; set; } // ABONO, LIQUIDO
        public string? NombreComercial { get; set; }
        public string? Distribuidor { get; set; }
        public string? Composicion { get; set; }
        public string? Proposito { get; set; }
        public string? ModoAplicacion { get; set; }
        public string? Compatibilidad { get; set; }
        public string? ReglaRestriccion { get; set; }
        public string? Presentacion { get; set; }
        public decimal? Precio { get; set; }
        public string? ImagenUrl { get; set; }
    }
}
