import * as Yup from 'yup';


const projectValidationSchema = Yup.object().shape({
  id_project:
    Yup.string().required().min(1).max(100),
  designation:
    Yup.string().required().min(5).max(50),
  _id_societe:
    Yup.string().required().min(1).max(100),
}, [
  ['id_project', 'id_project'],
  ['designation', 'designation'],
  ['_id_societe', '_id_societe'],
]);

export default projectValidationSchema