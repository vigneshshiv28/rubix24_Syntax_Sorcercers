import GridOwner from "../models/GridOwner.js";

const getGridOwner = async (req, res) => {
    try {
        
        const id = req.params.id;
        console.log(id);
        
        const user = await GridOwner.findById(id);
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export { getGridOwner };