import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState); // Текущие стили
	const [formState, setFormState] = useState(defaultArticleState); // Временные настройки в форме
	const [isOpen, setIsOpen] = useState(false); //  Форма открыта или закрыта

	// функия применения стилей
	const handleApplyArticle = () => {
		setArticleState(formState);
		setIsOpen(false);
	};

	// функция для сброса к стандартным настройкам
	const handleResetArticle = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
		setIsOpen(false);
	};

	// функция обновления формы
	const handleFormChange = (newState: ArticleStateType) => {
		setFormState(newState);
	};
	//}
	//открыть закрыть
	const switchOpenClose = () => setIsOpen(!isOpen);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				onToggle={switchOpenClose}
				formState={formState}
				onFormChange={handleFormChange}
				onApply={handleApplyArticle}
				onReset={handleResetArticle}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
