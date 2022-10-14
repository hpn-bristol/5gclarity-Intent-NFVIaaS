"""
Contains intent matching class for 5G-CLARITY Intent Engine.
"""

from gensim.models import fasttext
from gensim.parsing.preprocessing import preprocess_string


class IntentMatcher:
    """
    Intent matching class, using gensim to match intents with available descriptions.
    """

    def __init__(self):
        self.model = fasttext.load_facebook_model('data/wiki.simple.bin')

    def match(self, intent_text, descriptions, top_n):
        """
        The match function is the core of the class, it performs the similarity check.
        """
        similarities = []
        intent_tokens = preprocess_string(intent_text)
        for description in descriptions:
            description_tokens = preprocess_string(description)
            similarities += [float(self.model.wv.n_similarity(intent_tokens, description_tokens)) if description_tokens else 0]
        return {
            'intent-matching': dict(
                sorted(zip(descriptions, similarities), key=lambda x: x[1], reverse=True)[:top_n]
            ),
            'intent': intent_text
        }


if __name__ == "__main__":
    matcher = IntentMatcher()
    INTENT_TEXT = 'I want to deploy function'
    description_texts = ['invoke function', 'execute function', 'deploy function', 'OK']
    print(matcher.match(INTENT_TEXT, description_texts, top_n=10))
