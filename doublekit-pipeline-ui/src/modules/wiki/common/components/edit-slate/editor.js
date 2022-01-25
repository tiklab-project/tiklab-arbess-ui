import React, { useMemo, useState, useCallback, Fragment, useImperativeHandle, useEffect } from "react";
import { createEditor, Transforms, Editor, Text, Node } from "slate";
import "./editor.scss";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import AttUpload from "./upload";
import ColorEditor from "./color"
import HeadEditor from "./head"
import FontSize from "./fontSize"
import ItalicEditor from "./italic"
import UnderlineEditor from "./underline"
import StrikeEditor from "./strike"
import LineHeightEditor from "./lineHeight"
import BackgroundColor from "./backgroundColor"
import LinkEditor, { withLinks } from "./link"
import TableEditor from "./table/table/table"
import ImageEditor, { withImage } from "./image"
import CheckListsEditor, { withChecklists } from "./checkListsEditor"
import UnorderedEditor from "./unorderedEditor"
import AlignEditor from "./align"
import DividerEditor, { withDivider } from "./divider"
import IndentEditor from "./indent"
import Emoji, { withEmoji } from "./emoji"
// import { withHistory } from 'slate-history'
import { inject, observer } from "mobx-react";
import renderElement from "./renderElement"
import Leaf from "./leaf"
import MoreEditor from "./More"
import withTables from "./table/table/withTables"
import withWorkTables from "./table/workTable/withTablesWork"
import SupEditor from "./sup"
import SubEditor from "./sub"
import BrEditor,{withBr} from "./br"
const CustomEditor = {
	isBoldMarkActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.bold === true,
			universal: true,
		});

		return !!match;
	},

	isCodeBlockActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === "code",
		});

		return !!match;
	},

	isAntdButtonBlockActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === "antdButton",
		});

		return !!match;
	},

	toggleBoldMark(editor) {
		const isActive = CustomEditor.isBoldMarkActive(editor);
		Transforms.setNodes(
			editor,
			{ bold: isActive ? null : true },
			{ match: (n) => Text.isText(n), split: true }
		);


	},

	toggleCodeBlock(editor) {
		const isActive = CustomEditor.isCodeBlockActive(editor);
		Transforms.setNodes(
			editor,
			{ type: isActive ? null : "code" },
			{ match: (n) => Editor.isBlock(editor, n) }
		);
	},

	toggleAntdButtonBlock(editor) {
		const isActive = CustomEditor.isAntdButtonBlockActive(editor);
		Transforms.setNodes(
			editor,
			{ type: isActive ? null : "antdButton" },
			{ match: (n) => Editor.isBlock(editor, n) }
		);
	},
};

// 定义我们的应用…
const DocumentEditor = (props) => {
	const {onChange,value,slatestore } = props;
	const [editor] = useState(() => withBr(withEmoji(withWorkTables(withDivider(withChecklists(withImage(withTables(withLinks(withReact(createEditor()))))))))));
	// 设置应用创建时的初始状态。
	// Define a leaf rendering function that is memoized with `useCallback`.
	const renderLeaf = useCallback((props) => {
		return <Leaf {...props} />;
	}, []);
	
	return (
		<Slate
			editor={editor}
			value={value}
			onChange={(value) => onChange(value)}
			// onChange={(value) => setValue(value)}
		>
			<div className="edit-toolbar">
				<span
					className="tool-item"
					onMouseDown={(event) => {
						event.preventDefault();
						CustomEditor.toggleBoldMark(editor);
					}}
				>
					<i className="iconfont iconbold"></i>
				</span>
				<span
					className="tool-item"
					onMouseDown={(event) => {
						event.preventDefault();
						CustomEditor.toggleCodeBlock(editor);
					}}
				>
					<i className="iconfont iconcode-view"></i>
				</span>
				<ItalicEditor editor={editor} />
				<UnderlineEditor editor={editor} />
				<StrikeEditor editor={editor} />
				<SupEditor editor={editor} />
				<SubEditor editor={editor} />
				<CheckListsEditor editor={editor} />
				{/* <BrEditor editor={editor} /> */}

				<AttUpload editor={editor} />



				<LinkEditor editor={editor} />
				<TableEditor editor={editor} />

				<UnorderedEditor editor={editor} />
				<DividerEditor editor={editor} />
				<IndentEditor editor={editor} />
				<Emoji editor={editor} />

				<AlignEditor editor={editor} />
				<ColorEditor editor={editor} />
				<BackgroundColor editor={editor} />
				<HeadEditor editor={editor} />
				<FontSize editor={editor} />
				<LineHeightEditor editor={editor} />
				<MoreEditor editor={editor} />
			</div>
			<Editable renderElement={useCallback(renderElement, [])} renderLeaf={renderLeaf} className="edit-box"/>
		</Slate>
	);
};
export default inject('slatestore')(observer(DocumentEditor))
