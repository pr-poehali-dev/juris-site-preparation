import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function NewsletterConsent() {
  return (
    <main className="bg-paper min-h-screen">
      <header className="bg-graphite-900 text-paper-50 py-10">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-golos text-xs uppercase tracking-[0.15em] text-graphite-300 hover:text-lime transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h1 className="font-cormorant text-4xl md:text-5xl text-graphite-900 leading-tight tracking-tight">
          Согласие на получение информационной и рекламной рассылки
        </h1>

        <div className="prose-policy mt-10 space-y-6 font-golos text-[15px] text-graphite-700 leading-relaxed">
          <p>
            Я, действуя свободно, своей волей и в своём интересе, в соответствии с частью 1
            статьи 18 Федерального закона от 13.03.2006 № 38-ФЗ «О рекламе» и статьёй 15
            Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» даю согласие
            Индивидуальному предпринимателю Закарьяевой Патимат Магомедовне ОГРНИП:
            324508100712587 (дата присвоения ОГРНИП: 17.12.2024); ИНН: 056104200127 (далее —
            «Оператор») на:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              направление мне информационных и рекламных сообщений о юридических услугах
              Оператора, изменениях законодательства, мероприятиях и специальных предложениях;
            </li>
            <li>
              обработку в указанных целях следующих персональных данных: фамилия, имя, отчество,
              номер телефона, адрес электронной почты.
            </li>
          </ul>

          <section>
            <h2 className="font-cormorant text-2xl text-graphite-900 mb-3">
              1. Каналы направления сообщений
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>по адресу электронной почты;</li>
              <li>по номеру телефона (СМС-сообщения, звонки, сообщения в мессенджерах).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-graphite-900 mb-3">
              2. Условия обработки
            </h2>
            <p>
              Согласие даётся на совершение следующих действий: сбор, запись, систематизация,
              накопление, хранение, уточнение (обновление, изменение), извлечение, использование,
              блокирование, удаление, уничтожение персональных данных. Обработка осуществляется
              с использованием средств автоматизации и без использования таких средств.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-graphite-900 mb-3">
              3. Срок действия и отказ от рассылки
            </h2>
            <p>
              Согласие действует до момента его отзыва. Я вправе в любой момент отказаться
              от получения рассылки: путём перехода по ссылке отказа от подписки, содержащейся
              в каждом электронном сообщении; путём направления заявления на адрес электронной
              почты Оператора zakaraevapatimat6@gmail.com либо письменного заявления по адресу
              Оператора. Оператор обязан немедленно прекратить рассылку по требованию лица,
              которому она адресована (часть 1 статьи 18 Закона № 38-ФЗ).
            </p>
          </section>

          <p>
            Я подтверждаю, что предоставление настоящего согласия не является условием оказания
            мне юридических услуг и предоставлено мною добровольно.
          </p>
        </div>
      </article>
    </main>
  );
}
