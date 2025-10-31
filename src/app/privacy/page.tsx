// demo.tsx
import React from "react";
import { CustomFooter } from "@/components/custom/custom-footer";
import { Navbar } from "@/components/ui/mini-navbar";

function ComponentDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-muted-foreground">
      <Navbar />
      <p className="text-xs text-background max-w-2xl pt-30">
        AVISO DE PRIVACIDAD INTEGRAL Fecha de última actualización: 30 de
        octubre de 2025 1. Identidad y Domicilio del Responsable. De conformidad
        con la Ley Federal de Protección de Datos Personales en Posesión de los
        Particulares (LFPDPPP), Juan Alvaro Hecht (en lo sucesivo el
        &quot;Responsable&quot; o &quot;Tesoria&quot;), con domicilio fiscal
        para oír y recibir notificaciones en Paseo del Mirador 1724, Colinas de
        San Xavier, 44660, Guadalajara, Jalisco, y con Registro Federal de
        Contribuyentes HEGJ020708HJCCRNA8 , es el responsable del uso y
        protección de sus datos personales. 2. Datos Personales que serán
        Sometidos a Tratamiento. 2. Datos Personales que serán Sometidos a
        Tratamiento. Para las finalidades señaladas en este aviso, recabaremos
        los siguientes datos personales: a) Datos de identificación y contacto
        (recolectados desde nuestro formulario de contacto en el sitio web):
        Nombre completo, correo electrónico y el contenido del mensaje que nos
        envíe. b) Datos para la prestación del servicio (recolectados durante el
        onboarding y dentro de la plataforma): Información fiscal (RFC,
        constancia de situación fiscal), información financiera (como estados de
        cuenta bancarios, información de ingresos y egresos), información
        contable, e información de autenticación para la conexión con portales
        gubernamentales (como el SAT), la cual es gestionada exclusivamente por
        nuestro proveedor de conectividad y no es almacenada ni conocida por
        Tesoria. 3. Finalidades del Tratamiento. Sus datos personales serán
        utilizados para las siguientes finalidades: A. Finalidades Primarias
        (necesarias para el servicio): Proveer, operar y mantener nuestros
        servicios de plataforma de análisis financiero (CFO como servicio).
        Procesar su información financiera y fiscal para generar reportes,
        análisis y proyecciones. Conectarnos a sus cuentas (previo
        consentimiento) para la extracción automática de datos (ej. SAT). Crear
        y administrar su cuenta de usuario. Brindar soporte técnico y atender
        sus solicitudes. Gestionar la facturación y cobranza del servicio.
        Cumplir con las obligaciones legales derivadas de nuestra relación. B.
        Finalidades Secundarias (requieren su consentimiento): Enviarle
        comunicaciones promocionales, boletines informativos (newsletters) o
        encuestas sobre nuestros productos. Si no desea que sus datos se
        utilicen para estas finalidades secundarias, puede indicarlo enviando un
        correo a juan@tesoria.ai. 4. Transferencia de Datos Personales. Le
        informamos que sus datos personales podrán ser compartidos, sin requerir
        su consentimiento, con los siguientes terceros, para el estricto
        cumplimiento de las finalidades primarias: * Proveedores de
        Infraestructura en la Nube: Para el almacenamiento y procesamiento de la
        información (Ej. Amazon Web Services, Google Cloud). * Proveedores de
        Conectividad: Para la estricta finalidad de extraer su información
        fiscal, sus datos son procesados por nuestro proveedor Syntage SATWS
        Technologies. Esta transferencia es necesaria para la prestación del
        Servicio. * Autoridades Gubernamentales: En caso de ser requerido por
        orden judicial o para el cumplimiento de obligaciones legales. 5.
        Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición). Usted
        tiene derecho a conocer qué datos personales tenemos de usted, para qué
        los utilizamos y las condiciones del uso que les damos (Acceso).
        Asimismo, es su derecho solicitar la corrección de su información
        personal (Rectificación); que la eliminemos de nuestros registros
        (Cancelación); así como oponerse al uso de sus datos para fines
        específicos (Oposición). Para el ejercicio de cualquiera de los derechos
        ARCO, usted deberá presentar la solicitud respectiva a través de un
        correo electrónico a juan@tesoria.ai, indicando su nombre completo y la
        descripción clara del derecho que desea ejercer. 6. Modificaciones al
        Aviso de Privacidad. El presente aviso de privacidad puede sufrir
        modificaciones derivadas de nuevos requerimientos legales o de nuestras
        propias necesidades operativas. Nos comprometemos a mantenerlo informado
        sobre los cambios publicando la versión actualizada en nuestro sitio web
        tesoria.ai.
      </p>
      <section className="text-background w-full">
        <CustomFooter />
      </section>
    </div>
  );
}

export default ComponentDemo;
