import React from "react";

const MyPDF = () => {
  return (
    <div>
      <p style="text-indent: 0pt;text-align: left;">
        <br />
      </p>
      <table
        style="border-collapse:collapse;margin-left:5.8095pt"
        cellspacing="0"
      >
        <tr style="height:23pt">
          <td
            style="width:496pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
            colspan="3"
          >
            <p
              class="s1"
              style="padding-left: 95pt;padding-right: 94pt;text-indent: 0pt;line-height: 11pt;text-align: center;"
            >
              T E C N O L Ó G I C O N A C I O N A L D E M É X I C O
            </p>
            <p
              class="s2"
              style="padding-left: 95pt;padding-right: 94pt;text-indent: 0pt;line-height: 11pt;text-align: center;"
            >
              I N S T I T U T O T E C N O L Ó G I C O D E C D. G U Z M Á N
            </p>
          </td>
        </tr>
        <tr style="height:22pt">
          <td
            style="width:72pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
            rowspan="3"
          >
            <p style="text-indent: 0pt;text-align: left;">
              <br />
            </p>
            <p style="padding-left: 11pt;text-indent: 0pt;text-align: left;">
              <span>
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <img
                        width="64"
                        height="66"
                        src="data:image/png;base64,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"
                      />
                    </td>
                  </tr>
                </table>
              </span>
            </p>
          </td>
          <td
            style="width:275pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
            rowspan="3"
          >
            <p style="text-indent: 0pt;text-align: left;">
              <br />
            </p>
            <p
              class="s2"
              style="padding-left: 89pt;text-indent: -71pt;text-align: left;"
            >
              <b>Nombre del documento:</b>Formato{" "}
              <span class="s3">para Solicitud de Visitas a Empresas</span>.
            </p>
            <p
              class="s1"
              style="padding-top: 6pt;padding-left: 17pt;text-indent: 0pt;text-align: left;"
            >
              Referencia de la norma:{" "}
              <span class="s2">ISO 9001:2015; 8.2.2, 8.5.1</span>
            </p>
          </td>
          <td style="width:149pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p
              class="s1"
              style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;"
            >
              Código:
              <span class="s2">ITCG-VI-PO-001-01</span>
            </p>
          </td>
        </tr>
        <tr style="height:22pt">
          <td style="width:149pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p
              class="s1"
              style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;"
            >
              Revisión:
              <span class="s2">6</span>
            </p>
          </td>
        </tr>
        <tr style="height:19pt">
          <td style="width:149pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p
              class="s2"
              style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;"
            >
              Pág. 1 de 1
            </p>
          </td>
        </tr>
      </table>
      <p style="text-indent: 0pt;text-align: left;">
        <br />
      </p>
      <h2 style="padding-top: 4pt;padding-left: 112pt;text-indent: 0pt;text-align: left;">
        INSTITUTO TECNOLÓGICO DE CIUDAD GUZMÁN
      </h2>
      <h1 style="padding-left: 69pt;text-indent: 0pt;text-align: center;">
        Subdirección Académica
      </h1>
      <p style="text-indent: 0pt;text-align: left;">
        <br />
      </p>
      <h1 style="padding-left: 69pt;text-indent: 0pt;text-align: center;">
        DEPARTAMENTO DE GESTIÓN TECNOLÓGICA Y VINCULACIÓN SOLICITUD DE VISITAS A
        EMPRESAS
      </h1>
      <p style="text-indent: 0pt;text-align: left;">
        <br />
      </p>
      <p style="padding-top: 7pt;padding-left: 18pt;text-indent: 0pt;text-align: left;">
        FECHA:
      </p>
      <p style="text-indent: 0pt;text-align: left;" />
      <p style="padding-left: 18pt;text-indent: 0pt;text-align: left;">
        PERIODO ESCOLAR:
      </p>
      <p style="text-indent: 0pt;text-align: left;">
        <br />
      </p>
      <table
        style="border-collapse:collapse;margin-left:15.17pt"
        cellspacing="0"
      >
        <tr style="height:35pt">
          <td style="width:24pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p style="text-indent: 0pt;text-align: left;">
              <br />
            </p>
            <p
              class="s2"
              style="padding-left: 3pt;text-indent: 0pt;text-align: left;"
            >
              No.
            </p>
          </td>
          <td style="width:93pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p style="text-indent: 0pt;text-align: left;">
              <br />
            </p>
            <p
              class="s2"
              style="padding-left: 6pt;text-indent: 0pt;text-align: left;"
            >
              Empresa / Ciudad
            </p>
          </td>
          <td style="width:123pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p style="text-indent: 0pt;text-align: left;">
              <br />
            </p>
            <p
              class="s2"
              style="padding-left: 44pt;text-indent: -22pt;line-height: 12pt;text-align: left;"
            >
              Área a observar y objetivo
            </p>
          </td>
          <td style="width:54pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p style="text-indent: 0pt;text-align: left;">
              <br />
            </p>
            <p
              class="s2"
              style="padding-left: 13pt;padding-right: 9pt;text-indent: -3pt;line-height: 12pt;text-align: left;"
            >
              Fecha / Turno
            </p>
          </td>
          <td style="width:57pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p style="text-indent: 0pt;text-align: left;">
              <br />
            </p>
            <p
              class="s2"
              style="padding-left: 11pt;text-indent: 0pt;text-align: left;"
            >
              Carrera
            </p>
          </td>
          <td style="width:51pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p style="text-indent: 0pt;text-align: left;">
              <br />
            </p>
            <p
              class="s2"
              style="padding-left: 6pt;padding-right: 5pt;text-indent: 4pt;line-height: 12pt;text-align: left;"
            >
              No. de alumnos
            </p>
          </td>
          <td style="width:119pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p style="text-indent: 0pt;text-align: left;">
              <br />
            </p>
            <p
              class="s2"
              style="padding-left: 3pt;text-indent: 0pt;text-align: left;"
            >
              Solicitante
            </p>
            <p
              class="s2"
              style="padding-left: 67pt;text-indent: 0pt;line-height: 11pt;text-align: left;"
            >
              Asignatura
            </p>
          </td>
        </tr>
      </table>
      <p style="text-indent: 0pt;text-align: left;">
        <br />
      </p>
      <p style="padding-top: 4pt;padding-left: 69pt;text-indent: 0pt;text-align: center;">
        NOMBRE Y FIRMA
      </p>
      <p style="padding-top: 8pt;padding-left: 69pt;text-indent: 0pt;line-height: 109%;text-align: center;">
        JEFE DEL DEPTO. DE SISTEMAS Y COMPUTACIÓN
      </p>
      <p style="text-indent: 0pt;text-align: left;">
        <br />
      </p>
      <p style="padding-left: 18pt;text-indent: 0pt;text-align: left;">
        c.c.p. Subdirección Académica
      </p>
      <p style="padding-left: 18pt;text-indent: 0pt;text-align: left;">
        c.c.p. Archivo.
      </p>
      <p style="padding-top: 4pt;padding-left: 36pt;text-indent: 0pt;text-align: center;">
        Vo. Bo.
      </p>
      <p style="padding-top: 8pt;padding-left: 18pt;text-indent: 0pt;line-height: 177%;text-align: center;">
        NOMBRE Y FIRMA SUBDIRECTOR ACADÉMICO
      </p>
      <p style="text-indent: 0pt;text-align: left;">
        <br />
      </p>
      <p style="text-indent: 0pt;text-align: left;">
        <br />
      </p>
      <p style="padding-left: 65pt;text-indent: 0pt;text-align: left;">
        Toda copia en PAPEL es un <b>“Documento No Controlado” </b>a excepción
        del original.
      </p>
    </div>
  );
};
export default MyPDF;
