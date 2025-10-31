// demo.tsx
import React from "react";
import { CustomFooter } from "@/components/custom/custom-footer";
import { Navbar } from "@/components/ui/mini-navbar";

function ComponentDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-muted-foreground">
      <Navbar />
      <p className="text-xs text-background max-w-2xl pt-30">
        TÉRMINOS Y CONDICIONES DE SERVICIO Fecha de última actualización: 30 de
        octubre de 2025 Estos Términos y Condiciones (&apos;Términos&apos;)
        rigen el acceso y uso del sitio web tesoria.ai y la plataforma de
        software de análisis financiero (el &apos;Servicio&apos;) ofrecidos por
        Juan Alvaro Hecht Garcin (en lo sucesivo &apos;Tesoria&apos;). 1.
        Aceptación de los Términos Al acceder a nuestro sitio web o utilizar
        nuestro Servicio, usted (&apos;Usuario&apos;) acepta estar sujeto a
        estos Términos. Si no está de acuerdo, no debe utilizar el Servicio. 2.
        Descripción del Servicio Tesoria proporciona una plataforma de software
        como servicio (SaaS) que permite a las empresas conectar sus fuentes de
        datos financieros (SAT, bancos, etc.) para generar reportes, análisis y
        proyecciones de flujo de efectivo. 3. Naturaleza del Servicio: VERSIÓN
        BETA (MVP) El Usuario reconoce y acepta expresamente que el Servicio se
        encuentra en una fase de &apos;Producto Mínimo Viable&apos; (MVP) o
        &apos;Beta&apos;. Esto significa que: El Servicio se proporciona
        &apos;TAL CUAL&apos; (AS-IS) y &apos;según disponibilidad&apos;. El
        Servicio puede contener errores, fallos o &apos;bugs&apos; que pueden
        afectar su funcionamiento o la precisión de los datos. Tesoria no
        garantiza que el Servicio esté libre de errores o que su funcionamiento
        sea ininterrumpido. 4. Cuentas y Responsabilidad del Usuario El Usuario
        es responsable de mantener la confidencialidad de sus credenciales de
        acceso. El Usuario es el único responsable de la veracidad, exactitud e
        integridad de la información y datos que carga o conecta a la
        plataforma. 5. Limitación de Responsabilidad (¡CLÁUSULA CRÍTICA!) No
        Asesoría Financiera: El Servicio proporciona herramientas de análisis y
        visualización de datos. La información generada por el Servicio no
        constituye asesoría financiera, contable, fiscal o de inversión. Las
        decisiones de negocio tomadas por el Usuario basadas en esta información
        son de su exclusiva responsabilidad. Exclusión de Daños: En la máxima
        medida permitida por la ley, Tesoria (Juan Alvaro Hecht Garcin) no será
        responsable por ningún daño directo, indirecto, incidental, consecuente,
        especial o punitivo (incluyendo, sin limitación, pérdida de ganancias,
        pérdida de datos, interrupción del negocio o mala toma de decisiones)
        que surja del uso, o la incapacidad de uso, del Servicio, incluso si se
        ha advertido de la posibilidad de dichos daños. Límite Máximo de
        Responsabilidad: En caso de que Tesoria sea encontrado responsable de
        algún daño, la responsabilidad total máxima se limitará a la cantidad
        total pagada por el Usuario a Tesoria por el Servicio durante los tres
        (3) meses anteriores al evento que dio lugar a la reclamación. 6.
        Propiedad Intelectual Tesoria y sus licenciantes son los únicos
        propietarios de todo derecho, título e interés sobre el Servicio, el
        software, la marca, el logo y todo el contenido del sitio web (excepto
        los datos del Usuario). El Usuario otorga a Tesoria una licencia
        limitada y no exclusiva para usar los datos cargados (su
        &apos;Contenido&apos;) únicamente con el fin de operar y proveer el
        Servicio. 7. Confidencialidad Tesoria tratará la información financiera
        y de negocio del Usuario como confidencial, de acuerdo con lo
        establecido en nuestro Aviso de Privacidad. 8. Terminación Tesoria se
        reserva el derecho de suspender o terminar el acceso al Servicio a
        cualquier Usuario que incumpla estos Términos. 9. Modificaciones a los
        Términos Tesoria puede modificar estos Términos en cualquier momento. Se
        notificará de los cambios publicándolos en el sitio web. El uso
        continuado del Servicio después de dichos cambios constituye la
        aceptación de los nuevos Términos. 10. Ley Aplicable y Jurisdicción
        Estos Términos se regirán por las leyes federales de los Estados Unidos
        Mexicanos. Para la interpretación y cumplimiento de estos Términos, las
        partes se someten a la jurisdicción de los tribunales competentes en la
        ciudad de GUADALAJARA, JALISCO, renunciando a cualquier otro fuero que
        pudiera corresponderles. 11. Contacto Para cualquier duda relacionada
        con estos Términos, puede contactarnos en juan@tesoria.ai
      </p>
      <section className="text-background w-full">
        <CustomFooter />
      </section>
    </div>
  );
}

export default ComponentDemo;
