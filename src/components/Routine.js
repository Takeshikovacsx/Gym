import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { FaDumbbell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Routine() {
    const { firebase } = useContext(FirebaseContext);
    const [Subiendo, setSubiendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [urlImagen, setUrlImagen] = useState('');
    const [rutinas, setRutinas] = useState([]);

    const navigate = useNavigate();

    const fetchRutinas = async () => {
        const rutinasRef = await firebase.db.collection('Rutinas').get();
        const rutinasData = rutinasRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRutinas(rutinasData);
    };

    useEffect(() => {
        fetchRutinas();
    }, []);

    const formik = useFormik({
        initialValues: {
            nombreRutina: '',
            tipoEjercicio: '',
            duracionRutina: '',
            descripcion: '',
            imagen: '',
        },
        validationSchema: Yup.object({
            nombreRutina: Yup.string()
                .min(5, 'El nombre de la rutina debe tener al menos 5 caracteres')
                .required('El campo de nombre de rutina es requerido'),
            tipoEjercicio: Yup.string()
                .required('El tipo de ejercicio es requerido'),
            duracionRutina: Yup.number()
                .required('La duración de la rutina es requerida'),
            descripcion: Yup.string(),
        }),
        onSubmit: async (rutina) => {
            try {
                rutina.existencia = true;
                rutina.imagen = urlImagen;
                await firebase.db.collection('Rutinas').add(rutina);
                alert('Rutina de ejercicio registrada exitosamente');
                formik.resetForm();
                navigate('/');
                fetchRutinas();
            } catch (e) {
                console.log(e);
            }
        },
    });

    const handleUploadStart = () => {
        setProgreso(0);
        setSubiendo(true);
    }

    const handleUploadError = (error) => {
        setSubiendo(false);
        console.log(error);
    }

    const handleUploadSuccess = async (nombreImagen) => {
        setSubiendo(false);
        setProgreso(100);

        const urlImagen = await firebase
            .storage
            .ref("Imgrutinas")
            .child(nombreImagen)
            .getDownloadURL();

        setUrlImagen(urlImagen);
    }

    const handleProgress = (progreso) => {
        setProgreso(progreso);
    }

    return (
        <>
            <div className='flex bg-gray-200'>
                <div className="flex ml-5 mt-5 mb-5 mr-10 bg-gray-800 flex-col justify-center px-6 py-10 border border-gray-800 border-4 p-4 rounded-lg p-4">
                    <div className="sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">Registrar Rutina de Ejercicio</h2>
                        <form onSubmit={formik.handleSubmit} className="space-y-6" action="#">
                            <div className="mt-10">
                                <label htmlFor="nombreRutina" className="block text-sm font-medium leading-6 text-white">
                                    Nombre de la Rutina
                                </label>
                                <input
                                    type="text"
                                    id="nombreRutina"
                                    name="nombreRutina"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    placeholder="Nombre de la rutina"
                                    value={formik.values.nombreRutina}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                            </div>
                            {formik.touched.nombreRutina && formik.errors.nombreRutina ? (
                                <div className='text-gray-200'>
                                    <p>{formik.errors.nombreRutina}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label htmlFor="tipoEjercicio" className="block text-sm font-medium leading-6 text-white">
                                    Tipo de Ejercicio
                                </label>
                                <input
                                    type="text"
                                    id="tipoEjercicio"
                                    name="tipoEjercicio"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    placeholder="Tipo de ejercicio"
                                    value={formik.values.tipoEjercicio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                            </div>
                            {formik.touched.tipoEjercicio && formik.errors.tipoEjercicio ? (
                                <div className='text-gray-200'>
                                    <p>{formik.errors.tipoEjercicio}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label htmlFor="duracionRutina" className="block text-sm font-medium leading-6 text-white">
                                    Duración de la Rutina (en minutos)
                                </label>
                                <input
                                    type="number"
                                    id="duracionRutina"
                                    name="duracionRutina"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    placeholder="Duración en minutos"
                                    value={formik.values.duracionRutina}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                            </div>
                            {formik.touched.duracionRutina && formik.errors.duracionRutina ? (
                                <div className='text-gray-200'>
                                    <p>{formik.errors.duracionRutina}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label htmlFor="imagen" className="block text-sm font-medium leading-6 text-white">
                                    Imagen
                                </label>
                                <FileUploader
                                    accept="image/*"
                                    id="imagen"
                                    name="imagen"
                                    randomizeFilename
                                    className='text-gray-400 '
                                    storageRef={firebase.storage.ref("Imgrutinas")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                            </div>
                            <div className="mb-4 ">
                                {Subiendo && (
                                    <div className='text-green-200'>
                                        <p>Subiendo: {progreso}%</p>
                                    </div>
                                )}
                                {urlImagen && (
                                    <div className='text-green-600'>
                                        <p>Imagen subida con éxito</p>
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-white">
                                    Descripción de la Rutina
                                </label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    rows="4"
                                    placeholder="Descripción de la rutina"
                                    value={formik.values.descripcion}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.descripcion && formik.errors.descripcion ? (
                                <div>
                                    <p>{formik.errors.descripcion}</p>
                                </div>
                            ) : null}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover-bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="py-5 justify-center">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Rutinas Existentes:</h2>
                    <div className="flex flex-wrap ">
                        {rutinas.map((rutina) => (
                            <div key={rutina.id} className="border p-4 m-4 bg-gray-800 rounded-lg text-white mx-auto">
                                <p className='text-xl font-semibold text-center'>Nombre de la Rutina: { rutina.nombreRutina}</p>
                                <img
                                    src={rutina.imagen}
                                    alt={rutina.nombreRutina}
                                    className="w-40 h-40 mx-auto mb-5 mt-5 border border-4 rounded-lg"
                                />
                                
                                <p className="text-gray-400 text-center">Tipo de Ejercicio: {rutina.tipoEjercicio}</p>
                                <p className="text-gray-400 text-center"> Duración de la Rutina: {rutina.duracionRutina} minutos</p>
                                <p className="text-gray-400 text-center">Descripción: {rutina.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Routine;
