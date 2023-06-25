import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    }
})

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema, "eventcategories")

export default Category;