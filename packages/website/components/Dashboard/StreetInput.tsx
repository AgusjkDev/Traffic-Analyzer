import { twMerge } from "tailwind-merge";

import { Svg } from "components";
import StyledInput from "./StyledInput";
import { useStreetInput } from "hooks";
import { svgs } from "data";
import { reduceSpaces } from "helpers";
import type { Street } from "types/schemas";

interface StreetInputProps {
    street?: Street;
}

export default function StreetInput({ street }: StreetInputProps) {
    const {
        streetName,
        isDisabled,
        inputRef,
        handleStreetName,
        handleBlur,
        handleCreate,
        handleUpdate,
        handleDelete,
    } = useStreetInput({ street });

    const isNew = !Boolean(street);

    const thereIsStreetName = Boolean(reduceSpaces(streetName));

    return (
        <form
            onSubmit={e => {
                e.preventDefault();

                return isNew ? handleCreate() : handleUpdate();
            }}
            className={twMerge("relative", !isNew && "group/container")}
        >
            <StyledInput
                ref={inputRef}
                disabled={!isNew && isDisabled}
                placeholder={street?.name ?? "Nueva calle"}
                value={streetName}
                onChange={e => handleStreetName(e.target.value)}
                onBlur={handleBlur}
                type="text"
                className={twMerge(
                    !isNew && "font-light disabled:text-primary-light",
                    !isNew && isDisabled && "group-hover/container:pr-14",
                    ((isNew && thereIsStreetName) || (!isNew && !isDisabled)) && "pr-8"
                )}
            />

            <div
                className={twMerge(
                    "absolute right-0 top-0 mr-1.5 flex h-full items-center gap-x-0.5",
                    !isNew && isDisabled && "opacity-0 group-hover/container:opacity-100"
                )}
            >
                {isNew ? (
                    <button
                        type="button"
                        className={twMerge("group", !thereIsStreetName && "hidden")}
                        onMouseDown={e => {
                            e.preventDefault();
                            handleCreate();
                        }}
                    >
                        <Svg
                            {...svgs.check}
                            width={22}
                            height={22}
                            className="fill-primary-light group-hover:fill-primary"
                        />
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            onMouseDown={e => {
                                e.preventDefault();
                                handleUpdate();
                            }}
                            className="group"
                        >
                            <Svg
                                {...svgs.edit}
                                width={22}
                                height={22}
                                className="fill-primary-light group-hover:fill-primary"
                            />
                        </button>

                        {isDisabled && (
                            <button
                                type="button"
                                onMouseDown={e => {
                                    e.preventDefault();
                                    handleDelete();
                                }}
                                className="group"
                            >
                                <Svg
                                    {...svgs.trash}
                                    width={22}
                                    height={22}
                                    className="fill-primary-light group-hover:fill-primary"
                                />
                            </button>
                        )}
                    </>
                )}
            </div>
        </form>
    );
}
