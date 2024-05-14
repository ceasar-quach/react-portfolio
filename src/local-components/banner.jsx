import ButtonPair from "./buttonPair";

export default function Banner (props) {
    const {
        section,
        page,
        activeKey,
        demoUrl,
        shortcutButton
    } = props;
    return (
        <div className="row mx-0 px-0 pt-3">
            <div className="bg-light-matte w-100 row p-4 m-0 justify-content-between align-items-start rounded-3 drop-shadow">
            {activeKey!=="/"+page&&
            <ButtonPair
                shortcutButton={shortcutButton}
                localUrl={activeKey}
                demoUrl={demoUrl}
                localLabel="Back"
            />
            }
            <h2 className="text-silver m-0 col-auto text-end align-self-end">{section.title}</h2>
            </div>
        </div>
    )
}