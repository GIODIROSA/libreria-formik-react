import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const Formulario = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  return (
    <>
      <Formik
        initialValues={{
          nombre: "",
          correo: "",
        }}
        validate={(valores) => {
          let errores = {};

          if (!valores.nombre) {
            errores.nombre = "Por favor, ingresa un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
            errores.nombre = "El nombre solo puede contener letras y espacios";
          }

          if (!valores.correo) {
            errores.correo = "Por favor, ingresa un correo";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.correo
            )
          ) {
            errores.correo =
              "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          //   console.log("formulario enviado");
          //   console.log("valores enviados", valores);
          // enviar a una base de datos... aqui llamada a un api para enviar los valores

          resetForm();
          cambiarFormularioEnviado(true);
          setTimeout(() => {
            cambiarFormularioEnviado(false);
          }, 3000);
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Joh Doe"
              />
              <ErrorMessage
                name="nombre"
                component={() => <div className="error">{errors.nombre}</div>}
              />
            </div>
            <div>
              <label htmlFor="correo">Correo</label>
              <Field
                type="email"
                id="correo"
                name="correo"
                placeholder="correo@correo.com"
              />
              <ErrorMessage
                name="correo"
                component={() => <div className="error">{errors.correo}</div>}
              />
            </div>
            <div>
              <label htmlFor="pais">País</label>
              <Field name="pais" as="select">
                <option value="">Selecciona un país</option>
                <option value="mexico">México</option>
                <option value="peru">Perú</option>
                <option value="argentina">Argentina</option>
              </Field>
            </div>

            <div>
              <label>
                <Field type="radio" name="sexo" value="hombre" /> Hombre
              </label>
              <label>
                <Field type="radio" name="sexo" value="mujer" /> Mujer
              </label>
            </div>

            <div>
              <Field name="mensaje" as="textarea" placeholder="Mensaje" />
            </div>

            <button type="submit">Enviar</button>
            {formularioEnviado && (
              <p className="exito">Formulario enviado con éxito!!!</p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
