const fs = require('fs');
const path = require('path');

exports.getConsultoras = async (event) => {
    // Verificar si 'codpais' está presente
    if (!event.pathParameters || !event.pathParameters.codpais) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "El parámetro 'codpais' es obligatorio" }),
        };
    }

    // Leer parámetros
    const { codpais } = event.pathParameters;
    const rows = event.queryStringParameters?.rows || 10;

    // Cargar datos desde el archivo JSON
    const dataPath = path.join(__dirname, 'consultants.json');
    const consultantsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Filtrar y limitar los resultados
    const filteredConsultants = consultantsData.filter(consultant => consultant.codpais === codpais).slice(0, rows);

    // Respuesta
    return {
        statusCode: 200,
        body: JSON.stringify(filteredConsultants),
    };
};
