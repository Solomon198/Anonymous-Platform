import Handlebars from "handlebars";
import path from "path";
import fs from "node:fs";

const templatePaths = path.resolve(
  __dirname,
  "../../",
  "dist/static/templates"
);

function getTemplate(templateId: string) {
  const templatePath = [
    path.resolve(templatePaths, templateId, "subject.hbs"),
    path.resolve(templatePaths, templateId, "html.hbs"),
    path.resolve(templatePaths, templateId, "text.hbs"),
  ];
  templatePath.forEach((path) => {
    if (!fs.existsSync(path)) {
      throw Error(`Path ${path} for templateId does not exist`);
    }
  });

  const [subject, html, text] = templatePath.map((path) => {
    return fs.readFileSync(path, { encoding: "utf-8" });
  });

  return {
    subject,
    html,
    text,
  };
}

export function getSMSCompiledTemplate(templateId: string, data: any) {
  const { text } = getTemplate(templateId);
  const compiledText = Handlebars.compile(text, { strict: true })(data);
  return compiledText;
}

export function getEmailCompiledTemplate(templateId: string, data: any) {
  const { html, subject } = getTemplate(templateId);
  const compiledHtml = Handlebars.compile(html, { strict: true })(data);
  const compiledSubject = Handlebars.compile(subject, { strict: true })(data);
  return { html: compiledHtml, subject: compiledSubject };
}
