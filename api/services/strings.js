/**
 * Common String Services
 *
 * @description :: Server-side logic for managing Telegram's BOT Updates
 * @author      :: Alejandro González - algope@github
 * @licence     :: The MIT License (MIT)
 *
 */

module.exports.getError =
    "Ups, eso no me lo esperaba... ¿Te has equivocado?";


module.exports.getWelcome = function (userName) {
    return "Hola " + userName + ", encantado de conocerte!\n" +
        "Mi nombre es civicBOT y te ayudaré a enviar y clasificar la información sobre la actuación de los partidos políticos.\n" +
        "Para empezar a enviar información, escribe: /enviar_info ";
};

module.exports.getHelp1 = "Para enviar información, escribe: /enviar_info\n\n" +
    "Para volver a empezar, escribe /start\n\n" +
    "Para enviarnos una sugerencia sobre civicBOT, escribe /sugerencia";
module.exports.getHelp2 =
    "Ahora dinos qué tipo de información quieres hacernos llegar: TEXTO o IMAGEN.\n\n" +
    "Para volver a empezar, escribe /start";
module.exports.getHelp3 =
    "Ahora envía la información del tipo que has seleccionado anteriormente.\n\n" +
    "Para volver a seleccionar un tipo de información distinto, escribe /enviar_info \n\n" +
    "Para volver a empezar, escribe /start";

module.exports.getFeedback =
    "Escribe la sugerencia que nos quieras hacer llegar:\n\n";

module.exports.getInfoSelect =
    "Selecciona el tipo de información que quieres hacernos llegar:\n\n";


module.exports.getTextSelected =
    "Ahora escribe el texto que quieras enviarnos:\n\n";

module.exports.getImageSelected =
    "Ahora envía la imagen:\n\n";


module.exports.getLabeling =
    "Si la información está relacionada con:\n\n" +
    "Campañas de comunicación institucionales o con medios de comunicación,\n ->pulsa A\n\n" +
    "Acceso y permanencia en el sistema educativo o con el Tercer Sector,\n ->pulsa B\n\n" +
    "Transparencia, participación o rendición de cuentas,\n ->pulsa C\n\n" +
    "Otros temas,\n ->pulsa D";

module.exports.getThanks =
    "¡Muchas gracias!";

