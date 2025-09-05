import {
    storyblokEditable,
    } from '@storyblok/react/rsc';


    
    export default function Product({ blok }) {
    return (
        <main {...storyblokEditable(blok)}>
        </main>
    );
    }