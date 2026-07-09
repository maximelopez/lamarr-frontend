import { useState,useRef, useEffect } from "react";
import {useMapsLibrary} from '@vis.gl/react-google-maps';

export default function PlaceAutocomplete() {
    const [isInputReadOnly, setIsInputReadOnly] = useState(true);
    const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken>(null);
    const placesService : google.maps.PlacesLibrary | null  = useMapsLibrary("places");
    const inputRef = useRef<HTMLInputElement>(null);
    const xBtnRef = useRef<HTMLButtonElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const [translatedSuggestions, setTranslatedSuggetions] = useState<google.maps.places.PlacePrediction[]>([]);
    useEffect(() => {
       if(!placesService) return;
       setIsInputReadOnly(false);
       sessionTokenRef.current = new placesService.AutocompleteSessionToken();
    },[placesService])
    useEffect(() => {
        if(!inputRef.current)return;
        inputRef.current.readOnly = isInputReadOnly;
        if(xBtnRef.current){ 
            xBtnRef.current.disabled = !isInputReadOnly;
        }
        if(selectRef.current) {
            if(isInputReadOnly === true) {
                setTranslatedSuggetions([]);
            }
            selectRef.current.disabled = isInputReadOnly;
        }
    },[isInputReadOnly])
    const searchPlace = async(input : string) => {
        if(input.length < 3) {
            // On veut +3 char
            return;
        }
        if(!sessionTokenRef.current) {
            console.error("PlaceAutocomplete Component : PlacesService not loaded");
            return;
        }
        const request : google.maps.places.AutocompleteRequest = {
            input : input,
            sessionToken : sessionTokenRef.current,
            region : "fr",
            language: "fr", 
            includedPrimaryTypes: ["premise"],
            includedRegionCodes : ["fr"]
        };
        const {suggestions}  = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        return suggestions;
    };
    const translateResult = (suggetions : google.maps.places.AutocompleteSuggestion[]) => {
        const placesPrediction : google.maps.places.PlacePrediction[] = [];
        suggetions.forEach((suggestion) => {
            if(suggestion.placePrediction){
                placesPrediction.push(suggestion.placePrediction);
            }
        })
        setTranslatedSuggetions(placesPrediction);
    };
    const handleOptionChange = (value: string) => {
        if(!inputRef.current) return;
        inputRef.current.value = value;
        setIsInputReadOnly(true);
    }
    return ( 
    <div className="autocomplete-div">
        <input ref={inputRef} className="autocomplete-input" type="text" onChange={(e)=> searchPlace(e.target.value).then((results) => {
            if(results){
                if(results.length < 1) setTranslatedSuggetions([]);
                else translateResult(results);
            }
         })}/>
        <select ref={selectRef} className="autocomplete-select" onChange={(e) => handleOptionChange(e.target.value) }>
        {translatedSuggestions.map((placePrediction, idx) => (
            <option key={idx} className="autocomplete-option">
                {placePrediction.text.text}
            </option>
        ))}
        </select>
        <button ref={xBtnRef} className="autocomplete-cancel-btn" type="button" onClick={(e)=> {
            setIsInputReadOnly(false);
            if(inputRef.current) inputRef.current.value = "";
        }}>X</button>
    </div>
    
)
}