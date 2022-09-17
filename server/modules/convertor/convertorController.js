const { successResponse, errorResponse} = require("../common");
const convertDecToRoman = require("./convertDecToRoman");

const convertorController = (req, res) => {
   try {
       const { data } = req.body;
       console.log("body", data);

       if (Number(data) === 0) {
           return res.status(200).json(
               successResponse("0")
           );
       }

       if (data < 0 || data > 100) throw new Error("Numeric value must be part of range 0 to 100");

       return res.status(200).json(
           successResponse(convertDecToRoman(data))
       );
   } catch (e) {
       return res.status(400).json(
           errorResponse(e.message)
       );
   }
};

module.exports = convertorController;
