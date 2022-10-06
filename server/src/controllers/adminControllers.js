const HttpError = require("../errors/http-error");
const libros = require("../../data/dataBook.json");
const { Categories, Books } = require("../db");

const adminControllers = {
  createBook: async (req, res, next) => {
    const {
      title,
      authors,
      publisher,
      ISBN,
      imageLinks,
      description,
      price,
      categories } = req.body
    try {
      const books = await Books.findOne({where: {title}});
      if (books) throw new HttpError("El libro ya existe", 400);
      else {
        const createBook = await Books.create({
          title,
          authors,
          publisher,
          ISBN,
          imageLinks,
          description,
          price,
        });
        const typeofBooks = await Categories.findAll({ where: { name:categories } });
        //console.log(typeofBooks.JSON())
        createBook.addCategories(typeofBooks);       
        return res.send("El libro fue creado");   
      }
    } catch (error) {
      if (!(error instanceof HttpError)) {
        error = new HttpError("No se pudo crear el libro, intente nuevamente más tarde", 500);
      }
      return next(error);
    }
  },
  deleteBook: async (req, res) => {
    try {
        const { idBook } = req.params;

        const book = await Books.findByPk(idBook);
        console.log(book)
        if (!book) throw "El libro no existe"

        await Books.update({
            activado: !book.activado
        }, { where: { id: idBook } })

        return res.status(200).send("La acción de realizo con éxito!!")
    } catch (error) {
        return res.status(400).send(error)
    }

},
updateBook: async (req, res) => {
    try {
        const { idBook } = req.params
        const {title,authors,publisher,ISBN,imageLinks,description,price,categories } = req.body

        const bookExist = await Books.findAll({
            where: {
                id: idBook
            }
        }).catch((err) => {
            return { error: err }
        })



        if (Array.isArray(bookExist)) {
            await Books.update({
              title,
              authors,
              publisher,
              ISBN,
              imageLinks,
              description,
              price
            }, { where: { id: idBook } })

            const categorieFound = await Categories.findAll({
                where: {
                    name: categories
                }
            });

            const arrayIdCategories = categorieFound.map(el => el.id);

            const book = await Books.findByPk(idBook);

            book.setCategories(arrayIdCategories)

            res.status(200).json(true)
        } else {
            throw "No se encontro productos"
        }
    } catch (error) {
       res.status(400).json(error)
        
    }

}
};

module.exports = adminControllers;
