using System;
using System.ComponentModel.DataAnnotations;

namespace ToDoList
{
    public class TodoList
    {
        [Key]
        public int Id { get; set; }

        public bool State { get; set; }
        [Required]
        public string Description { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd'/'MM'/'yyyy}", ApplyFormatInEditMode = true)]
        [Display(Name = "CreateDate")]
        public DateTime Date { get; set; }

    }
}
