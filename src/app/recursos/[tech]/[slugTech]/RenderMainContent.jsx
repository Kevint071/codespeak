import React from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import plaintext from "highlight.js/lib/languages/plaintext";
import bash from "highlight.js/lib/languages/bash";
import powershell from "highlight.js/lib/languages/powershell";
import "highlight.js/styles/atom-one-dark.css";
import { CopyButton } from "@/components/ui";
import DOMPurify from "isomorphic-dompurify";

// Registro de lenguajes para el resaltado de código
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("powershell", powershell);

const RenderBlocks = ({ content, categoria }) => {
	// Renderiza los estilos y el contenido de los "child" basado en su formato
	const renderChild = (child) => {
		const {
			text = "",
			bold,
			italic,
			strikethrough,
			code,
			type,
			url,
			children,
		} = child;

		// Renderiza el texto con negrita, cursiva, tachado o código
		if (bold)
			return (
				<strong className="font-semibold text-violet-400">
					{text}
				</strong>
			);
		if (italic) return <em>{text}</em>;
		if (strikethrough) return <s>{text}</s>;
		if (code) {
			const highlightedCode = hljs.highlight(text, {
				language: categoria,
			}).value;
			return (
				<code
					className="rounded bg-gray-800 px-1 py-0.5 text-sm"
					// Uso de dangerouslySetInnerHTML para resaltar el código
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Se usa dompurify para limpiar el código
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(highlightedCode),
					}}
				/>
			);
		}
		// Renderiza los enlaces con soporte para abrir en nueva pestaña
		if (type === "link") {
			return (
				<a href={url} target="_blank" rel="noopener noreferrer">
					{children ? children.map(renderChild) : text}
				</a>
			);
		}

		// Si no hay formato especial, devuelve el texto sin modificar
		return text;
	};

	// Renderiza bloques de contenido según su tipo (párrafo, encabezado, lista, etc.)
	const renderBlock = (block) => {
		const { type, children, level } = block;
		switch (type) {
			case "paragraph":
				return (
					<p className="my-6 text-[17px] leading-8">
						{/* Renderiza cada "child" del párrafo */}
						{children.map((child, idx) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Don´t necessary
							<React.Fragment key={idx}>
								{renderChild(child)}
							</React.Fragment>
						))}
					</p>
				);
			case "heading": {
				const HeadingTag = `h${level || 1}`; // Determina el nivel del encabezado
				let headingClass = "font-bold";

				// Ajusta las clases según el nivel del encabezado
				switch (level) {
					case 1:
						headingClass += " " + "text-4xl my-4";
						break;
					case 2:
						headingClass +=
							" " + "text-3xl mt-6 mb-2 text-cyan-300";
						break;
					case 3:
						headingClass +=
							" " + "text-2xl mt-4 mb-1 text-purple-400";
						break;
					default:
						headingClass += " " + "text-xl mt-4 mb-1";
				}

				return (
					<HeadingTag className={headingClass}>
						{children.map(renderChild)}
					</HeadingTag>
				);
			}
			case "list":
				return renderList(block); // Renderiza una lista (ordenada o no)
			case "image":
				return renderImage(block); // Renderiza una imagen
			case "code":
				return renderCodeBlock(block); // Renderiza un bloque de código
			default:
				return null;
		}
	};

	// Renderiza listas, ya sean ordenadas o no
	const renderList = ({ format, children }) => {
		const ListTag = format === "ordered" ? "ol" : "ul"; // Determina el tipo de lista
		const listStyle =
			format === "ordered"
				? { listStyleType: "decimal" }
				: { listStyleType: "disc" };

		return (
			<ListTag
				className="mb-3 ml-8 mt-8 text-[17px] font-light leading-6"
				style={listStyle}
			>
				{children.map((item, index) => (
					<li
						// biome-ignore lint/suspicious/noArrayIndexKey: Don´t necessary
						key={index}
						style={{ display: "list-item", marginBottom: "20px" }}
					>
						{/* Renderiza cada "child" de la lista */}
						{item.children.map((child, idx) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Don´t necessary
							<React.Fragment key={idx}>
								{renderChild(child)}
							</React.Fragment>
						))}
					</li>
				))}
			</ListTag>
		);
	};

	// Renderiza imágenes con su texto alternativo y leyenda
	const renderImage = ({ image }) => {
		if (!image) return null; // Verifica si hay una imagen válida

		return (
			<figure className="my-4">
				<img
					src={image.url}
					alt={image.alternativeText || ""} // Usa texto alternativo si está disponible
					width={image.width}
					height={image.height}
					className="h-auto max-w-full"
				/>
				{image.caption && (
					<figcaption className="mt-2 text-center">
						{image.caption} {/* Muestra la leyenda de la imagen */}
					</figcaption>
				)}
			</figure>
		);
	};

	// Renderiza bloques de código con resaltado de sintaxis
	const renderCodeBlock = ({ language = "plaintext", children }) => {
		const code = children[0].text;
		const highlightedCode = hljs.highlight(code, { language }).value; // Aplica resaltado
		const lines = highlightedCode.split("\n"); // Divide el código en líneas

		return (
			<div className="my-10 overflow-hidden rounded-lg bg-gray-900 shadow-lg">
				<div className="flex items-center justify-between bg-gray-800 px-4 py-2">
					<span className="text-sm font-medium text-cyan-400">
						{language === "powershell" ? "shell" : language}
					</span>
					<CopyButton code={code} />{" "}
					{/* Botón para copiar el código */}
				</div>
				<div className="flex">
					{/* Números de línea */}
					<div className="flex flex-col bg-gray-900 px-3 pt-[14px] text-right font-mono text-sm text-gray-500">
						{lines.map((_, i) => (
							<div key={_} className="select-none pl-3 text-sm">
								{i + 1}. {/* Muestra el número de línea */}
							</div>
						))}
					</div>
					<pre className="custom-scroll flex overflow-x-auto py-[14px] pl-3 pr-5">
						<code
							className={"text-sm"}
							// Uso de dangerouslySetInnerHTML para mostrar el código resaltado
							// biome-ignore lint/security/noDangerouslySetInnerHtml: Se usa dompurify para limpiar el código
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(highlightedCode),
							}}
						/>
					</pre>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col text-lg">
			{/* Verifica si hay contenido disponible para renderizar */}
			{content && content.length > 0 ? (
				content.map((block, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: Don´t necessary
					<React.Fragment key={index}>
						{renderBlock(block)}{" "}
						{/* Renderiza cada bloque de contenido */}
					</React.Fragment>
				))
			) : (
				// Mensaje si no hay contenido disponible
				<p>No hay contenido disponible.</p>
			)}
		</div>
	);
};

export default RenderBlocks;
