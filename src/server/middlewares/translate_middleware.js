/***************************************************************
 * Middleware to translate exceptions of services              *
 *                                                             *
 * @author ErickCervantes <erick.cervantesacosta.5@gmail.com>  *
 ***************************************************************/

import config from './../../config';

import translate from 'express-translate';
import esTranslations from './../../lib/translations/translations.es';

const transExceptions = (req, res, next)=>{        
   let eTranslate= new translate();
   eTranslate.addLanguage('es', esTranslations);

   req.trans=eTranslate.translator('es');
   next();
};


export default transExceptions;